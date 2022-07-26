import bcrypt from 'bcrypt';
export const passwordHasher = async (password) => {
    const saltRounds = 10;
    const Hash = await bcrypt.hash(password, saltRounds)
    return Hash;
}