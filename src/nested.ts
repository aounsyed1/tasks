import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion, duplicateQuestion } from "./objects";

export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((q) => q.published);
}

export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (q) => q.body !== "" || q.expected !== "" || q.options.length > 0,
    );
}

export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    return questions.find((q) => q.id === id) ?? null;
}

export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((q) => q.id !== id);
}

export function getNames(questions: Question[]): string[] {
    return questions.map((q) => q.name);
}

export function sumPoints(questions: Question[]): number {
    return questions.reduce((sum, q) => sum + q.points, 0);
}

export function sumPublishedPoints(questions: Question[]): number {
    return sumPoints(getPublishedQuestions(questions));
}

export function toCSV(questions: Question[]): string {
    const header = "id,name,options,points,published";
    const rows = questions.map(
        (q) =>
            `${q.id},${q.name},${q.options.length},${q.points},${q.published}`,
    );
    return [header, ...rows].join("\n");
}

export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((q) => ({
        questionId: q.id,
        text: "",
        submitted: false,
        correct: false,
    }));
}

export function publishAll(questions: Question[]): Question[] {
    return questions.map((q) => ({ ...q, published: true }));
}

export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) return true;
    return questions.every((q) => q.type === questions[0].type);
}

export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return questions.map((q) =>
        q.id === targetId ? { ...q, name: newName } : q,
    );
}

export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    return questions.map((q) => {
        if (q.id !== targetId) return q;
        return {
            ...q,
            type: newQuestionType,
            options:
                newQuestionType !== "multiple_choice_question" ? [] : q.options,
        };
    });
}

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((q) => {
        if (q.id !== targetId) return q;
        const newOptions =
            targetOptionIndex === -1 ?
                [...q.options, newOption]
            :   q.options.map((opt, i) =>
                    i === targetOptionIndex ? newOption : opt,
                );
        return { ...q, options: newOptions };
    });
}

export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    const result: Question[] = [];
    for (const q of questions) {
        result.push(q);
        if (q.id === targetId) {
            result.push(duplicateQuestion(newId, q));
        }
    }
    return result;
}
