<template>
  <div id="welcome" v-page-title :data-title="pageTitle">
    <div class="container">
      <h1>食事IAT</h1>
      <el-tabs
        :value="tabs[currentTabIndex]"
        :before-leave="handleTabLeave"
        style="min-height: 400px;"
      >
        <!-- プロジェクト概要 -->
        <el-tab-pane label="プロジェクト概要" name="welcome" :disabled="true">
          <h2>プロジェクト概要</h2>
          <p>
            いくつかの簡単なアンケートと潜在連合テストを行いますので、提示される単語と画像に対してできるだけ早く反応するよう心がけてください。 この調査は、おいしい食べ物に関する人々の印象の一部を理解する際に役立ちます。このアンケートは、10分以内に完了します。
          </p>
          <p>
            ：
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </p>
          <p> <a href="mailto:i.feiweiwei@gmail.com">i.feiweiwei@gmail.com</a>。</p>

          <h2>注意事項</h2>
          <p style="font-weight:800;">
            このテストを実施する際には、キーボードを備えたPCが必要です。
          </p>
        </el-tab-pane>
        <!-- テストの説明 -->
        <el-tab-pane label="テストの説明" name="intro" :disabled="true">
          <h2>テストの説明</h2>
          <p>
            キーボードの <span class="in">e</span>と
            <span class="in">i</span>
            を使用して，現れた単語や画像をできるだけ早く分類してくだい。
          </p>
          <p>4つのグループ：</p>
          <h3>1.美味しいを表す形容詞：</h3>
          <p>
            <el-tag
              style="background-color: transparent; color: black; margin-right: 5px;"
              v-for="(word, index) in words.positive"
              :key="'positive-word-' + index"
              >{{ word }}</el-tag
            >
          </p>
          <h3>2.不味いを表す形容詞：</h3>
          <p>
            <el-tag
              style="background-color: transparent; color: black; margin-right: 5px;"
              v-for="(word, index) in words.negative"
              :key="'negative-word-' + index"
              >{{ word }}</el-tag
            >
          </p>
          <h3>3.温かい色の食べ物</h3>
          <p style="text-indent:0;">
            <img :src="images.warmImageIntro" style="width: 100%;" />
          </p>
          <h3>4.冷たい色の食べ物</h3>
          <p style="text-indent:0;">
            <img :src="images.coldImageIntro" style="width: 100%;" />
          </p>
          <p>
            このテストには7つのパートがあり、それぞれのパートについて事前に説明がありますので、よく読んでください。
          </p>
        </el-tab-pane>

        <!-- 基本表单信息 -->
        <el-tab-pane label="基本情報" name="form" :disabled="true">
          <h2>基本情報入力</h2>
          <div class="form">
            <el-form
              :ref="userFormName"
              :model="userInfoForm"
              label-width="80px"
            >
              <el-form-item label="生年">
                <el-date-picker
                  v-model="userInfoForm.birthYear"
                  type="year"
                  placeholder="年"
                  value-format="yyyy"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="userInfoForm.gender" size="medium">
                  <el-radio-button :label="0">女性</el-radio-button>
                  <el-radio-button :label="1">男性</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="学歴">
                <el-radio-group v-model="userInfoForm.edu" size="medium">
                  <el-radio-button
                    v-for="(item, index) in eduOptions"
                    :key="index"
                    :label="item[0]"
                    >{{ item[1] }}</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="">
                <el-radio-group v-model="userInfoForm.dysopia" size="medium">
                  <el-radio-button
                    v-for="(item, index) in dysopiaOptions"
                    :key="index"
                    :label="item[1]"
                    >{{ item[0] }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="">
                <el-radio-group v-model="userInfoForm.relation" size="medium">
                  <el-radio-button
                    v-for="(item, index) in relateOptions"
                    :key="index"
                    :label="item[1]"
                    >{{ item[0] }}</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="">
                <el-rate
                  v-model="userInfoForm.hunger"
                  :max="9"
                  :texts="rateConfig.texts"
                  :low-threshold="3"
                  :high-threshold="7"
                  :icon-classes="rateConfig.iconClasses"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  void-icon-class="el-icon-tableware"
                  show-text
                  style="padding-top:10px;"
                >
                </el-rate>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div style="margin-top: 40px;" class="button-group">
        <el-button v-if="currentTabIndex > 0" type="primary" @click="handlePrev"
          >上一步</el-button
        >
        <el-button
          type="primary"
          @click="nextButtonHandler"
          :disabled="buttonDisabled"
          >{{ nextButtonText }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserInfo } from "@/interfaces/user";
import { Words, Images } from "@/data";
import { TYPES } from "@/store/mutations";

interface RateConfig {
  texts: string[];
  iconClasses: string[];
}

@Component({})
export default class Welcome extends Vue {
  // config
  private tabs: string[] = ["welcome", "intro", "form"];
  private images = Images;
  private dysopiaOptions = [
    ["", "none"],
    ["", "red_all"],
    ["", "green_all"],
    ["", "blue_yellow_all"],
    ["", "all"],
    ["", "all_weak"],
    ["", "red_weak"],
    ["", "green_weak"],
    ["", "blue_yellow_weak"]
  ];
  private eduOptions = [
    ["mid", ""],
    ["sen", ""],
    ["bachelor", ""],
    ["graduate", ""],
    ["doctor", ""]
  ];
  private relateOptions = [
    ["", "single"],
    ["", "loved"],
    ["", "engaged"],
    ["", "married"],
    ["", "broke"],
    ["", "divorced"],
    ["", "other"]
  ];
  private words = Words;
  private rateConfig: RateConfig = {
    texts: [
      "非常饿",
      "很饿",
      "有点饿",
      "不太饿",
      "一般",
      "不太饱",
      "有点饱",
      "很饱",
      "非常饱"
    ],
    iconClasses: ["el-icon-goblet", "el-icon-goblet-full", "el-icon-food"]
  };
  // page state
  private currentTabIndex = 0;
  private userFormName = "userBaiscForm";
  // user data
  private rate = 0;
  private welcomeStats = {
    readInstructionStart: 0,
    readInstructionEnd: 0,
    userInfoStart: 0,
    userInfoEnd: 0
  };
  private userInfoForm: UserInfo = {
    birthYear: "",
    gender: 2,
    edu: "",
    dysopia: "",
    relation: "",
    hunger: 0
  };

  get isValid() {
    if (!this.userInfoForm.birthYear) return false;
    if (this.userInfoForm.birthYear === "") return false;
    const year = parseInt(this.userInfoForm.birthYear);
    if (year < 1940 || year > 2015) return false;
    if (
      this.userInfoForm.gender === 2 ||
      this.userInfoForm.edu === "" ||
      this.userInfoForm.dysopia === "" ||
      this.userInfoForm.relation === "" ||
      this.userInfoForm.hunger === 0
    ) {
      return false;
    }
    return true;
  }

  get pageTitle() {
    if (this.isLastTab) {
      return "请填写您的基本信息 | 饮食内隐联想测验";
    }
    return "项目说明 | 饮食内隐联想测验";
  }

  get isLastTab() {
    return this.currentTabIndex === this.tabs.length - 1;
  }

  get buttonDisabled() {
    if (!this.isLastTab) return false;
    if (this.isValid) return false;
    return true;
  }

  get nextButtonHandler() {
    // handle next
    if (this.isLastTab) {
      return this.submitForm;
    }
    return this.handleNext;
  }

  get nextButtonText() {
    if (this.isLastTab) {
      return "次へ";
    }
    return "次へ";
  }

  created() {
    this.welcomeStats.readInstructionStart = Date.now();
  }

  handleTabLeave(toTabName: string) {
    if (
      toTabName === this.tabs[2] &&
      this.welcomeStats.readInstructionEnd === 0 &&
      this.welcomeStats.userInfoStart === 0
    ) {
      this.welcomeStats.readInstructionEnd = Date.now();
      this.welcomeStats.userInfoStart = Date.now();
    }
  }

  logUserStats() {
    this.$store.commit(TYPES.LOG_WELCOME_STATS, this.welcomeStats);
  }

  submitForm() {
    if (!this.isValid) return;
    this.$store.commit(TYPES.UPDATE_USER_INFO, this.userInfoForm);
    this.welcomeStats.userInfoEnd = Date.now();
    this.$store.commit(TYPES.LOG_WELCOME_STATS, this.welcomeStats);
    this.$router.push("/iat/main");
  }

  handleNext() {
    if (this.currentTabIndex < this.tabs.length - 1) {
      this.currentTabIndex++;
    }
  }

  handlePrev() {
    if (this.currentTabIndex > 0) {
      this.currentTabIndex--;
    }
  }
}
</script>

<style lang="less">
#welcome {
  padding-top: 60px;
  max-width: 900px;
  padding: 40px;
  margin: auto;
  .container {
    margin-bottom: 60px;
    text-align: left;
    p {
      text-indent: 2em;
      span.in {
        padding: 3px 8px;
        text-indent: 0;
        display: inline-block;
        border-radius: 5px;
        font-weight: 600;
        font-size: 14px;
        background-color: #409eff;
        color: white;
      }
      span {
        text-indent: 0;
      }
    }
    .el-form-item__label {
      width: 150px !important;
      text-align: left;
    }
  }
}
</style>
