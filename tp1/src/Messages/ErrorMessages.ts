import { ValidationArguments } from "class-validator";
export const ValidationErrors = {
	min: (
		validationData: ValidationArguments,
	) => `La taille de votre ${validationData.property} ${validationData.value} est courte,
    la taille minimale de ${validationData.property} est ${validationData.constraints[0]}`,
	max: (
		validationData: ValidationArguments,
	) => `La taille de votre ${validationData.property} ${validationData.value} est longue,
    la taille maximale de ${validationData.property} est ${validationData.constraints[0]}`,
	isNotEmpty: (validationData: ValidationArguments) =>
		`La propriété ${validationData.property} ne peut pas être vide`,
	isEnum: (validationData: ValidationArguments) => {
		console.log(validationData);
		return `La propriété ${
			validationData.property
		} doit être une de ces valeurs : ${validationData.constraints[1].map(
			(val) => `${val}`,
		)}`;
	},
};
