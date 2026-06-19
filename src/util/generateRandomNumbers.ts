export const generateRandomNumber = (min: number, max: number) => {
	if (min > max) {
		throw new Error('Min cannot be greater than max.')
	}

	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateNumbersWithSum = (ranges: Range[], targetSum: number = 100): number[] => {
	if (ranges.length !== 4) {
		throw new Error('Musisz podać 4 przedziały.')
	}

	const totalMin = ranges.reduce((sum, r) => sum + r.min, 0)
	const totalMax = ranges.reduce((sum, r) => sum + r.max, 0)

	if (targetSum < totalMin || targetSum > totalMax) {
		throw new Error(`Suma ${targetSum} nie mieści się w granicach możliwych sum (${totalMin} - ${totalMax}).`)
	}

	let numbers = ranges.map(r => generateRandomNumber(r.min, r.max))

	while (true) {
		const currentSum = numbers.reduce((sum, n) => sum + n, 0)
		const diff = targetSum - currentSum
		if (diff === 0) break

		const randomIndex = Math.floor(Math.random() * 4)
		const currentNum = numbers[randomIndex]
		const range = ranges[randomIndex]

		if (diff > 0 && currentNum < range.max) {
			numbers[randomIndex]++
		} else if (diff < 0 && currentNum > range.min) {
			numbers[randomIndex]--
		}
	}

	return numbers
}
