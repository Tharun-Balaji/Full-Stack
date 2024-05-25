
const login = async (req, res) => {
    res.send("Fake login/register/ routes")
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.send(200).json({
        msg: `Hello Tharun`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
};

module.exports = {
    login,
    dashboard
};

