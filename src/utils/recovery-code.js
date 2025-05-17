

const generateRecoveryCode = (length=50) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let recoveryCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        recoveryCode += characters[randomIndex];
    }
    return recoveryCode;
}

module.exports = generateRecoveryCode