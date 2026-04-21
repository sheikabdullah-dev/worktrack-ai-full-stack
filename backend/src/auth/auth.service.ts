import { Injectable, HttpException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(private supabaseService: SupabaseService) { }

    async signup(email: string, password: string) {

        if (!email || !password) {
            throw new HttpException("Email & Password required", 400);
        }

        const supabase = this.supabaseService.getClient();

        // ✅ CHECK DUPLICATE
        const { data: existing } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existing) {
            throw new HttpException("Email already exists", 409);
        }

        const hashed = await bcrypt.hash(password, 10);

        const { error } = await supabase
            .from('users')
            .insert([{ email, password: hashed }]);

        if (error) {
            throw new HttpException(error.message, 400);
        }

        return {
            success: true,
            message: "Account created successfully"
        };
    }

    async login(email: string, password: string) {

        const supabase = this.supabaseService.getClient();

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            throw new HttpException("User not found", 404);
        }

        const valid = await bcrypt.compare(password, data.password);

        if (!valid) {
            throw new HttpException("Invalid password", 401);
        }

        const token = jwt.sign(
            { userId: data.id },
            "SECRET_KEY",
            { expiresIn: "1d" }
        );

        return {
            success: true,
            token
        };
    }
}