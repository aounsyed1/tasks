import { Question, QuestionType } from "./interfaces/question";

export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType,
): Question {
    return {
        id,
        name,
        type,
        body: "",
        expected: "",
        options: [],
        points: 1,
        published: false,
    };
}

export function isCorrect(question: Question, answer: string): boolean {
    return (
        answer.trim().toLowerCase() === question.expected.trim().toLowerCase()
    );
}

export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.slice(0, 10)}`;
}

export function toMarkdown(question: Question): string {
    const lines: string[] = [];
    lines.push(`# ${question.name}`);
    lines.push(question.body);

    if (question.type === "multiple_choice_question") {
        for (const option of question.options) {
            lines.push(`- ${option}`);
        }
    }

    return lines.join("\n");
}

export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        id,
        name: `Copy of ${oldQuestion.name}`,
        type: oldQuestion.type,
        body: oldQuestion.body,
        expected: oldQuestion.expected,
        options: [...oldQuestion.options],
        points: oldQuestion.points,
        published: false,
    };
}

export function addOption(question: Question, newOption: string): Question {
    return { ...question, options: [...question.options, newOption] };
}

export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number },
): Question {
    return {
        id,
        name,
        type: contentQuestion.type,
        body: contentQuestion.body,
        expected: contentQuestion.expected,
        options: [...contentQuestion.options],
        points,
        published: false,
    };
}
