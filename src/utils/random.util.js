const fRandom = (cant) => {
  const randomNum = {};
  for (let index = 0; index < cant; index++) {
    const keyRand = Math.floor(Math.random() * (1000 - 1) + 1);

    if (randomNum[keyRand] === undefined || randomNum[keyRand] === null) {
      randomNum[keyRand] = 1;
    } else {
      randomNum[keyRand] = Number(randomNum[keyRand]) + 1;
    }
  }
  return randomNum;
};

process.on('message', (cant) => {
  const randomResults = fRandom(Number(cant));
  process.send(randomResults);
});
