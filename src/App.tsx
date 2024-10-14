import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [comparisons, setComparisons] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [numberCount, setNumberCount] = useState(5);

  useEffect(() => {
    resetGame();
  }, [numberCount]);

  const resetGame = () => {
    const newNumbers = Array.from({ length: numberCount }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5);
    setNumbers(newNumbers);
    setComparisons(0);
    setRounds(0);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const handleSwap = (swap: boolean) => {
    if (isFinished) return;

    setComparisons(prev => prev + 1);

    if (swap) {
      const newNumbers = [...numbers];
      [newNumbers[currentIndex], newNumbers[currentIndex + 1]] = [newNumbers[currentIndex + 1], newNumbers[currentIndex]];
      setNumbers(newNumbers);
    }

    if (currentIndex + 2 >= numbers.length - rounds) {
      setCurrentIndex(0);
      setRounds(prev => prev + 1);
    } else {
      setCurrentIndex(prev => prev + 1);
    }

    checkIfSorted();
  };

  const checkIfSorted = () => {
    const sorted = numbers.every((num, index) => {
      if (index === numbers.length - 1) return true;
      return sortOrder === 'asc' ? num <= numbers[index + 1] : num >= numbers[index + 1];
    });

    if (sorted) {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">冒泡排序小游戏</h1>
      <div className="mb-4">
        <label className="mr-2">排序数量:</label>
        <input
          type="number"
          min="2"
          max="10"
          value={numberCount}
          onChange={(e) => setNumberCount(Math.min(10, Math.max(2, parseInt(e.target.value) || 2)))}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => setSortOrder('asc')}
          className={`mr-2 px-4 py-2 rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          从小到大 <ArrowUp className="inline" />
        </button>
        <button
          onClick={() => setSortOrder('desc')}
          className={`px-4 py-2 rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          从大到小 <ArrowDown className="inline" />
        </button>
      </div>
      <div className="flex mb-4">
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center border ${
              index === currentIndex || index === currentIndex + 1
                ? 'bg-yellow-200'
                : 'bg-white'
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <button
          onClick={() => handleSwap(true)}
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
          disabled={isFinished}
        >
          交换
        </button>
        <button
          onClick={() => handleSwap(false)}
          className="px-4 py-2 bg-red-500 text-white rounded"
          disabled={isFinished}
        >
          不交换
        </button>
      </div>
      <div className="mb-4">
        <p>比较次数: {comparisons}</p>
        <p>排序轮数: {rounds}</p>
      </div>
      {isFinished && (
        <div className="mb-4">
          <p className="text-green-500 font-bold">排序成功！</p>
          <p>总比较次数: {comparisons}</p>
          <p>总排序轮数: {rounds}</p>
        </div>
      )}
      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        重新开始 <RotateCcw className="inline" />
      </button>
    </div>
  );
}

export default App;