import { TestPack, SingleTest } from "@/interfaces/test";
import { Shuffle } from "@/core";

export const Words = {
  positive: ["おいしい", "美味", "魅力的", "魅力的", "食欲をそそる"],
  negative: ["まずい", "魅力的でない", "味がない", "味が悪い", "美味しくない"]
};

export const staticBase =
  "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/";
export const cdnBase =
  "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/versions/2/";
const warmImages = [];
const coldImages = [];
for (let i = 1; i < 9; i++) {
  warmImages.push(cdnBase + "1-" + i + ".jpg");
}
for (let i = 1; i < 9; i++) {
  coldImages.push(cdnBase + "2-" + i + ".jpg");
}
const coldImageIntro = cdnBase + "cold.png";
const warmImageIntro = cdnBase + "warm.png";

export const Images = {
  warmImages,
  coldImages,
  coldImageIntro,
  warmImageIntro
};

const buildTestCase = (
  wordsOrImages: string[],
  isImage: boolean,
  positiveOrNegative: "positive" | "negative"
): SingleTest[] => {
  const testCases: SingleTest[] = [];
  for (const imageOrWord of wordsOrImages) {
    testCases.push({
      testDescription: isImage ? "" : imageOrWord,
      positiveOrNegative,
      isImage,
      imageURL: isImage ? imageOrWord : ""
    });
  }
  return testCases;
};

const baseImageTestCases: SingleTest[] = [];
baseImageTestCases.push(...buildTestCase(warmImages, true, "positive"));
baseImageTestCases.push(...buildTestCase(coldImages, true, "negative"));
const baseWordTestCases: SingleTest[] = [];
baseWordTestCases.push(...buildTestCase(Words.positive, false, "positive"));
baseWordTestCases.push(...buildTestCase(Words.negative, false, "negative"));

const reversedImageTestCases: SingleTest[] = [];
reversedImageTestCases.push(...buildTestCase(warmImages, true, "negative"));
reversedImageTestCases.push(...buildTestCase(coldImages, true, "positive"));
const reversedWordTestCases: SingleTest[] = [];
reversedWordTestCases.push(...buildTestCase(Words.positive, true, "negative"));
reversedWordTestCases.push(...buildTestCase(Words.negative, true, "positive"));

const title = (cur: number, all: number): string =>
  ` ${cur}  /  ${all} `;
// Initial cases
const InitCases = [
  // p1
  {
    instruction: {
      title: "",
      cmds: [
        "表示される画像が暖かい色の食べ物の場合、左手でEを押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "表示される画像が冷たい色の食べ物の場合、右手でIを押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "写真は一枚ずつ表示されます。 ",
        "",
        "間違ったものを選択した場合は、赤い×印が表示されます。 この時点で別の文字キーを選択すると、次の画像に進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行ってください。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "温かい食べ物",
    negativeTitle: "冷たい食べ物",
    testCases: Shuffle([...baseImageTestCases, ...baseImageTestCases])
  },
  // p2
  {
    instruction: {
      title: "",
      cmds: [
        "美味しいに関わる形容詞が出てきたら、左手でEを押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "美味しくないに関わる形容詞が出てきたら、右手でIを押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "単語ごとに表示されます。",
        "",
        "誤って選択をすると、赤い×印が表示されます。この時点で別のアルファベットキーを選択すると、自動で消え、次のセクションへ進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行なってください</bold></h3>",
        ""
      ]
    },
    positiveTitle: "美味しいを表現する形容詞",
    negativeTitle: "不味いを表現する形容詞",
    testCases: Shuffle([...baseWordTestCases, ...baseWordTestCases])
  },
  // p3
  {
    instruction: {
      title: "",
      cmds: [
        "温かい食べ物 or 美味しいなどの形容詞が出た場合左手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "冷たい食べ物 or 美味しくないなどの形容詞が出た場合右手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "",
        "誤って選択をすると、赤い×印が表示されます。この時点で別のアルファベットキーを選択すると、自動で消え、次のセクションへ進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行なってください</bold></h3>",
        ""
      ]
    },
    positiveTitle: "美味しいを表現する形容詞  or  温かい食べ物",
    negativeTitle: "不味いを表現する形容詞  or  冷たい食べ物",
    testCases: Shuffle([...baseWordTestCases, ...baseImageTestCases])
  },
  // p4 check
  {
    instruction: {
      title: "",
      cmds: [
        "温かい食べ物 or 美味しいなどの形容詞が出た場合左手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "冷たい食べ物 or 美味しくないなどの形容詞が出た場合右手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "",
        "誤って選択をすると、赤い×印が表示されます。この時点で別のアルファベットキーを選択すると、自動で消え、次のセクションへ進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行なってください</bold></h3>",
        ""
      ]
    },
    positiveTitle: "美味しいを表現する形容詞  or  温かい食べ物",
    negativeTitle: "不味いを表現する形容詞  or  冷たい食べ物",
    testCases: Shuffle([
      ...baseWordTestCases,
      ...baseImageTestCases,
      ...baseWordTestCases,
      ...baseImageTestCases
    ])
  },
  // p5 reversed
  {
    instruction: {
      title: "",
      cmds: [
        "表示される画像が冷たい食品の場合は、左手で押してください。<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "表示される画像が温かい食品の場合は、右手で押してください。<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "",
        "誤って選択をすると、赤い×印が表示されます。この時点で別のアルファベットキーを選択すると、自動で消え、次のセクションへ進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行なってください</bold></h3>",
        ""
      ]
    },
    positiveTitle: "冷たい食べ物",
    negativeTitle: "温かい食べ物",
    testCases: Shuffle([...reversedImageTestCases, ...reversedImageTestCases])
  },
  // p6 reversed
  {
    instruction: {
      title: "",
      cmds: [
        "冷たい食べ物 or 美味しいなどの形容詞が出た場合左手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "温かい食べ物 or 美味しくないなどの形容詞が出た場合右手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "",
        "誤って選択をすると、赤い×印が表示されます。この時点で別のアルファベットキーを選択すると、自動で消え、次のセクションへ進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行なってください</bold></h3>",
        ""
      ]
    },
    positiveTitle: "美味しいを表現する形容詞  or  冷たい食べ物",
    negativeTitle: "不味いを表現する形容詞  or  温かい食べ物",
    testCases: Shuffle([...baseWordTestCases, ...reversedImageTestCases])
  },
  // p7 reversed check
  {
    instruction: {
      title: "",
      cmds: [
        "冷たい食べ物 or 美味しいなどの形容詞が出た場合左手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>アルファベットキー。",
        "温かい食べ物 or 美味しくないなどの形容詞が出た場合右手で押してください<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>アルファベットキー。",
        "",
        "誤って選択をすると、赤い×印が表示されます。この時点で別のアルファベットキーを選択すると、自動で消え、次のセクションへ進みます。",
        "<h3><bold>可能な限り迅速かつ正確に行なってください</bold></h3>"
      ]
    },
    positiveTitle: "美味しいを表現する形容詞  or  冷たい食べ物",
    negativeTitle: "不味いを表現する形容詞  or  温かい食べ物",
    testCases: Shuffle([
      ...baseWordTestCases,
      ...reversedImageTestCases,
      ...baseWordTestCases,
      ...reversedImageTestCases
    ])
  }
];

// Test cases sequence
const sequence = [5, 2, 6, 7, 1, 3, 4].map(val => val - 1);

// Final test cases on the page
export const TestPacks: TestPack[] = sequence.map(
  (index: number, thisIndex: number): TestPack => {
    const tempTP = InitCases[index];
    tempTP.instruction.title = title(thisIndex + 1, sequence.length);
    return tempTP;
  }
);
