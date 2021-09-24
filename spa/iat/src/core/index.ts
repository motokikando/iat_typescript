import { FinishedTestPack } from "@/interfaces/result";
import { ChooseEventPayload } from "@/interfaces/payload";
// Shuffle given list, with side effect.
export const Shuffle = (list: any[]): any[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
};

export const AVG = (finishedTests: ChooseEventPayload[]): number => {
  return (
    finishedTests
      .map((val: ChooseEventPayload): number => val.elapsed)
      .reduce((prev, curr: number): number => prev + curr) /
    finishedTests.length
  );
};

// Calculate D-Score
export const DScore = (finishedTestPacks: FinishedTestPack[]): number => {
  const avg7 = AVG(finishedTestPacks[6].finishedTests);
  const avg4 = AVG(finishedTestPacks[3].finishedTests);
  return avg7 - avg4;
};

export const DScoreExplanation = (dScore: number): string =>
  dScore > 0
    ? `
    データを分析すると、暖かい色とおいしい食べ物を結びつける傾向があります。 これは、「おいしい言葉」＋「温かい食べ物の写真」と「おいしくない言葉」＋「冷たい食べ物の写真」を連想したときの方が、「おいしい言葉」＋「冷たい食べ物の写真」と「温かい食べ物の写真」を連想したときよりも早く反応する傾向があるからです。 "と、"おいしい言葉"＋"冷たい食べ物の絵 "と、"おいしくない言葉"＋"冷たい食べ物の絵 "を連想したときよりも、反応速度が速くなります。 "暖かい食べ物の写真 "です。`
    : `
    データを分析すると、クールな色はおいしい食べ物を連想させる傾向があることがわかります。 これは、「おいしい言葉」＋「涼しげな色の食べ物の写真」と「おいしくない言葉」＋「暖かな色の食べ物の写真」を連想したときの方が、「おいしい言葉」＋「暖かな色の食べ物の写真」を連想したときよりも早く反応する傾向があるからです。 "と、"おいしい言葉"＋"温かい食べ物の写真 "と "おいしくない言葉"＋"温かい食べ物の写真 "を連想したときよりも、反応速度が速くなります。 "冷たい食べ物の写真 "です。
    `;
