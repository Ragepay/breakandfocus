import { User } from '../model';
import { sendMailForget } from '../mailer';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { BCRYPT_ROUNDS } from '../../config/environment';

export async function forgetPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
        const existingUser = await User.findOne({ email }).exec();

        if (!existingUser) {
            return { success: false, message: "User not found." };
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
        const bytes = randomBytes(12);
        const newPassword = Array.from(bytes)
            .map((b) => chars[b % chars.length])
            .join('');

        const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(BCRYPT_ROUNDS));
        await User.findByIdAndUpdate(existingUser._id, { password: hashPassword });
        await sendMailForget(email, newPassword);

        return { success: true, message: "Password reset email sent. Check email." };

    } catch (err) {
        throw err;
    }
}