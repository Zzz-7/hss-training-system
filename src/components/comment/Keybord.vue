<template>
  <div class="keybord" @click.stop>
    <div>
      <div v-if="show">
        <img
          @mouseenter="mouseenterkey(index,item,$event)"
          @mouseout="mouseoutkey(index,item,$event)"
          @click="clickkey(index,item,$event)"
          :src="item"
          v-for="(item,index) in listImg"
          :key="index"
          class="keysmall"
        />
      </div>
      <div v-if="!show">
        <img
          @mouseenter="mouseenterkey1(index,item,$event)"
          @mouseout="mouseoutkey1(index,item,$event)"
          :src="item"
          @click="clickkey1(index,item,$event)"
          v-for="(item,index) in listImg1"
          :key="index"
        />
      </div>
      <span class="changeA" @click="changeA()">{{changeNum}}</span>
      <span class="changeA delete" @click="deleteKey()">删除</span>
      <span class="submit" @click="submit()">确定</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fieldId", "latexId",'showKeyCode'],
  data() {
    return {
      changeNum: "切换大写",
      show: true,
      Mathmessage: "",
      mathField:'',
      listImg: [
        require("../../assets/images/keybore_slices/keybord_one@2x.png"),
        require("../../assets/images/keybore_slices/keybord_two@2x.png"),
        require("../../assets/images/keybore_slices/keybord_three@2x.png"),
        require("../../assets/images/keybore_slices/keybord_four@2x.png"),
        require("../../assets/images/keybore_slices/keybord_five@2x.png"),
        require("../../assets/images/keybore_slices/keybord_six@2x.png"),
        require("../../assets/images/keybore_slices/keybord_seven@2x.png"),
        require("../../assets/images/keybore_slices/keybord_eight@2x.png"),
        require("../../assets/images/keybore_slices/keybord_nine@2x.png"),
        require("../../assets/images/keybore_slices/keybord_zero@2x.png"),

        require("../../assets/images/keybore_slices/keybord_point@2x.png"),
        require("../../assets/images/keybore_slices/keybord_add@2x.png"),
        require("../../assets/images/keybore_slices/keybord_cut@2x.png"),
        require("../../assets/images/keybore_slices/keybord_addcut@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalgreater@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalless@2x.png"),
        require("../../assets/images/keybore_slices/keybord_greater@2x.png"),
        require("../../assets/images/keybore_slices/keybord_less@2x.png"),
        require("../../assets/images/keybore_slices/keybord_mutiple@2x.png"),
        require("../../assets/images/keybore_slices/keybord_div@2x.png"),
        require("../../assets/images/keybore_slices/keybore_or@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifangn@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifang@2x.png"),
        require("../../assets/images/keybore_slices/keybore_squaremore@2x.png"),
        require("../../assets/images/keybore_slices/keybore_square@2x.png"),
        require("../../assets/images/keybore_slices/keybored@2x.png"),
        require("../../assets/images/keybore_slices/keybord_division@2x.png"),
        require("../../assets/images/keybore_slices/keybord_pai@2x.png"),
        require("../../assets/images/keybore_slices/keybord@2x.png"),
        require("../../assets/images/keybore_slices/keybord_@2x.png"),
        
        require("../../assets/images/keybore_slices/keybord_a@2x.png"),
        require("../../assets/images/keybore_slices/keybord_b@2x.png"),
        require("../../assets/images/keybore_slices/keybord_c@2x.png"),
        require("../../assets/images/keybore_slices/keybord_d@2x.png"),
        require("../../assets/images/keybore_slices/keybord_e@2x.png"),
        require("../../assets/images/keybore_slices/keybord_f@2x.png"),
        require("../../assets/images/keybore_slices/keybord_g@2x.png"),
        require("../../assets/images/keybore_slices/keybord_h@2x.png"),
        require("../../assets/images/keybore_slices/keybord_i@2x.png"),
        require("../../assets/images/keybore_slices/keybord_j@2x.png"),
        require("../../assets/images/keybore_slices/keybord_k@2x.png"),
        require("../../assets/images/keybore_slices/keybord_l@2x.png"),
        require("../../assets/images/keybore_slices/keybord_m@2x.png"),
        require("../../assets/images/keybore_slices/keybord_n@2x.png"),
        require("../../assets/images/keybore_slices/keybord_o@2x.png"),
        require("../../assets/images/keybore_slices/keybord_p@2x.png"),
        require("../../assets/images/keybore_slices/keybord_q@2x.png"),
        require("../../assets/images/keybore_slices/keybord_r@2x.png"),
        require("../../assets/images/keybore_slices/keybord_s@2x.png"),
        require("../../assets/images/keybore_slices/keybord_t@2x.png"),
        require("../../assets/images/keybore_slices/keybord_u@2x.png"),
        require("../../assets/images/keybore_slices/keybord_v@2x.png"),
        require("../../assets/images/keybore_slices/keybord_w@2x.png"),
        require("../../assets/images/keybore_slices/keybord_x@2x.png"),
        require("../../assets/images/keybore_slices/keybord_y@2x.png"),
        require("../../assets/images/keybore_slices/keybord_z@2x.png"),
      ],
      listmouseenterkey: [
        require("../../assets/images/keybore_slices/keybord_1_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_two_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_three_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_four_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_five_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_six_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_seven_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_eight_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_nine_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_zaro_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_point_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_add_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_cut_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_addcut_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalgreater_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalless_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_greater_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_less_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_mutiple_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_div_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_or_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifangn_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifang_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_squaremore_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_square_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybored_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_division_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_pai_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord__hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_a_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_b_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_c_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_d_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_e_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_f_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_g_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_h_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_i_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_j_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_k_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_l_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_m_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_n_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_o_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_p_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_q_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_r_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_s_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_t_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_u_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_v_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_w_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_x_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_y_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_z_hover@2x.png"),
      ],
      listImg1: [
        require("../../assets/images/keybore_slices/keybord_one@2x.png"),
        require("../../assets/images/keybore_slices/keybord_two@2x.png"),
        require("../../assets/images/keybore_slices/keybord_three@2x.png"),
        require("../../assets/images/keybore_slices/keybord_four@2x.png"),
        require("../../assets/images/keybore_slices/keybord_five@2x.png"),
        require("../../assets/images/keybore_slices/keybord_six@2x.png"),
        require("../../assets/images/keybore_slices/keybord_seven@2x.png"),
        require("../../assets/images/keybore_slices/keybord_eight@2x.png"),
        require("../../assets/images/keybore_slices/keybord_nine@2x.png"),
        require("../../assets/images/keybore_slices/keybord_zero@2x.png"),
        require("../../assets/images/keybore_slices/keybord_point@2x.png"),
        require("../../assets/images/keybore_slices/keybord_add@2x.png"),
        require("../../assets/images/keybore_slices/keybord_cut@2x.png"),
        require("../../assets/images/keybore_slices/keybord_addcut@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalgreater@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalless@2x.png"),
        require("../../assets/images/keybore_slices/keybord_greater@2x.png"),
        require("../../assets/images/keybore_slices/keybord_less@2x.png"),
        require("../../assets/images/keybore_slices/keybord_mutiple@2x.png"),
        require("../../assets/images/keybore_slices/keybord_div@2x.png"),
        require("../../assets/images/keybore_slices/keybore_or@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifangn@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifang@2x.png"),
        require("../../assets/images/keybore_slices/keybore_squaremore@2x.png"),
        require("../../assets/images/keybore_slices/keybore_square@2x.png"),
        require("../../assets/images/keybore_slices/keybored@2x.png"),
        require("../../assets/images/keybore_slices/keybord_division@2x.png"),
        require("../../assets/images/keybore_slices/keybord_pai@2x.png"),
        require("../../assets/images/keybore_slices/keybord@2x.png"),
        require("../../assets/images/keybore_slices/keybord_@2x.png"),
        require("../../assets/images/keybore_slices/keybord_AA@2x.png"),
        require("../../assets/images/keybore_slices/keybord_BB@2x.png"),
        require("../../assets/images/keybore_slices/keybord_CC@2x.png"),
        require("../../assets/images/keybore_slices/keybord_DD@2x.png"),
        require("../../assets/images/keybore_slices/keybord_EE@2x.png"),
        require("../../assets/images/keybore_slices/keybord_FF@2x.png"),
        require("../../assets/images/keybore_slices/keybord_GG@2x.png"),
        require("../../assets/images/keybore_slices/keybord_HH@2x.png"),
        require("../../assets/images/keybore_slices/keybord_II@2x.png"),
        require("../../assets/images/keybore_slices/keybord_JJ@2x.png"),
        require("../../assets/images/keybore_slices/keybord_KK@2x.png"),
        require("../../assets/images/keybore_slices/keybord_LL@2x.png"),
        require("../../assets/images/keybore_slices/keybord_MM@2x.png"),
        require("../../assets/images/keybore_slices/keybord_NN@2x.png"),
        require("../../assets/images/keybore_slices/keybord_OO@2x.png"),
        require("../../assets/images/keybore_slices/keybord_PP@2x.png"),
        require("../../assets/images/keybore_slices/keybord_QQ@2x.png"),
        require("../../assets/images/keybore_slices/keybord_RR@2x.png"),
        require("../../assets/images/keybore_slices/keybord_SS@2x.png"),
        require("../../assets/images/keybore_slices/keybord_TT@2x.png"),
        require("../../assets/images/keybore_slices/keybord_UU@2x.png"),
        require("../../assets/images/keybore_slices/keybord_VV@2x.png"),
        require("../../assets/images/keybore_slices/keybord_WW@2x.png"),
        require("../../assets/images/keybore_slices/keybord_XX@2x.png"),
        require("../../assets/images/keybore_slices/keybord_YY@2x.png"),
        require("../../assets/images/keybore_slices/keybord_ZZ@2x.png"),
      ],
      listmouseenterkey1: [
        require("../../assets/images/keybore_slices/keybord_1_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_two_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_three_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_four_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_five_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_six_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_seven_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_eight_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_nine_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_zaro_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_point_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_add_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_cut_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_addcut_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalgreater_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_equalless_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_greater_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_less_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_mutiple_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_div_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_or_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifangn_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_kaifang_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_squaremore_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybore_square_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybored_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_division_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_pai_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord__hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_AA_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_BB_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_CC_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_DD_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_EE_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_FF_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_GG_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_HH_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_II_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_JJ_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_KK_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_LL_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_MM_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_NN_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_OO_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_PP_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_QQ_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_RR_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_SS_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_TT_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_UU_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_VV_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_WW_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_XX_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_YY_hover@2x.png"),
        require("../../assets/images/keybore_slices/keybord_ZZ_hover@2x.png"),
      ],
    };
  },
  methods: {
    //切换键盘
    changeA() {
      this.show = !this.show;
      if (this.show) {
        this.changeNum = "切换大写";
      } else {
        this.changeNum = "切换小写";
      }
    },
    mouseenterkey(index, item, event) {
      $(event.target).attr("src", this.listmouseenterkey[index]);
    },
    mouseoutkey(index, item, event) {
      $(event.target).attr("src", this.listImg[index]);
    },
    mouseenterkey1(index, item, event) {
      $(event.target).attr("src", this.listmouseenterkey1[index]);
    },
    mouseoutkey1(index, item, event) {
      $(event.target).attr("src", this.listImg1[index]);
    },
    //小写键盘
    clickkey(index, item, event) {
      switch (index) {
        case 0:
          this.getNum("1", this.fieldId, this.latexId);
          break;
        case 1:
          this.getNum("2", this.fieldId, this.latexId);
          break;
        case 2:
          this.getNum("3", this.fieldId, this.latexId);
          break;
        case 3:
          this.getNum("4", this.fieldId, this.latexId);
          break;
        case 4:
          this.getNum("5", this.fieldId, this.latexId);
          break;
        case 5:
          this.getNum("6", this.fieldId, this.latexId);
          break;
        case 6:
          this.getNum("7", this.fieldId, this.latexId);
          break;
        case 7:
          this.getNum("8", this.fieldId, this.latexId);
          break;
        case 8:
          this.getNum("9", this.fieldId, this.latexId);
          break;
        case 9:
          this.getNum("0", this.fieldId, this.latexId);
          break;
        case 10:
          this.getNum(".", this.fieldId, this.latexId);
          break;
        case 11:
          this.getNum("+", this.fieldId, this.latexId);
          break;
        case 12:
          this.getNum("-", this.fieldId, this.latexId);
          break;
        case 13:
          this.getNum("\\pm", this.fieldId, this.latexId);
          break;
        case 14:
          this.getNum("\\ge", this.fieldId, this.latexId);
          break;
        case 15:
          this.getNum("\\le", this.fieldId, this.latexId);
          break;
        case 16:
          this.getNum("\\gt", this.fieldId, this.latexId);
          break;
        case 17:
          this.getNum("\\lt", this.fieldId, this.latexId);
          break;
        case 18:
          this.getNum("\\times", this.fieldId, this.latexId);
          break;
        case 19:
          this.getNum("\\div", this.fieldId, this.latexId);
          break;
          case 20:
          this.getNum("\\left(\\right)", this.fieldId, this.latexId);
          break;
        case 21:
          this.getNum("\\sqrt[]{}", this.fieldId, this.latexId);
          break; //根号
        case 22:
          this.getNum("\\sqrt{}", this.fieldId, this.latexId);
          break; //二次根式
        case 23:
          this.getNum("\\^{}", this.fieldId, this.latexId);
          break; //次方
        case 24:
          this.getNum("\\^{2}", this.fieldId, this.latexId);
          break; //二次方
        case 25:
          this.getNum("\\left|\\right|", this.fieldId, this.latexId);
          // setTimeout(() => {
          //   this.getNum("|", this.fieldId, this.latexId);
          // });
          break; //绝对值
        case 26:
          //   this.Mathmessage += "\\frac{ }{ }";
          this.getNum("\\frac{}{}", this.fieldId, this.latexId);
          break; //几分之几
        case 27:
          //   this.Mathmessage += "\\pi";
          this.getNum("\\pi", this.fieldId, this.latexId);
          break;
        case 28:
          //   this.Mathmessage += "&perp;";
          this.getNum("\\bot", this.fieldId, this.latexId);
          break;
        case 29:
          this.getNum("//", this.fieldId, this.latexId);
          // setTimeout(() => {
          //   this.getNum("/", this.fieldId, this.latexId);
          // });
          break;
        case 30:
          this.getNum("a", this.fieldId, this.latexId);
          break;
        case 31:
          this.getNum("b", this.fieldId, this.latexId);
          break;
        case 32:
          this.getNum("c", this.fieldId, this.latexId);
          break;
        case 33:
          this.getNum("d", this.fieldId, this.latexId);
          break;
        case 34:
          this.getNum("e", this.fieldId, this.latexId);
          break;
        case 35:
          this.getNum("f", this.fieldId, this.latexId);
          break;
        case 36:
          this.getNum("g", this.fieldId, this.latexId);
          break;
        case 37:
          this.getNum("h", this.fieldId, this.latexId);
          break;
        case 38:
          this.getNum("i", this.fieldId, this.latexId);
          break;
        case 39:
          this.getNum("j", this.fieldId, this.latexId);
          break;
        case 40:
          this.getNum("k", this.fieldId, this.latexId);
          break;
        case 41:
          this.getNum("l", this.fieldId, this.latexId);
          break;
        case 42:
          this.getNum("m", this.fieldId, this.latexId);
          break;
        case 43:
          this.getNum("n", this.fieldId, this.latexId);
          break;
        case 44:
          this.getNum("o", this.fieldId, this.latexId);
          break;
        case 45:
          this.getNum("p", this.fieldId, this.latexId);
          break;
        case 46:
          this.getNum("q", this.fieldId, this.latexId);
          break;
        case 47:
          this.getNum("r", this.fieldId, this.latexId);
          break;
        case 48:
          this.getNum("s", this.fieldId, this.latexId);
          break;
        case 49:
          this.getNum("t", this.fieldId, this.latexId);
          break;
        case 50:
          this.getNum("u", this.fieldId, this.latexId);
          break;
        case 51:
          this.getNum("v", this.fieldId, this.latexId);
          break;
        case 52:
          this.getNum("w", this.fieldId, this.latexId);
          break;
        case 53:
          this.getNum("x", this.fieldId, this.latexId);
          break;
        case 54:
          this.getNum("y", this.fieldId, this.latexId);
          break;
        case 55:
          this.getNum("z", this.fieldId, this.latexId);
          break;
      }
    },
    //大写键盘
    clickkey1(index, item, event) {
      switch (index) {
        case 0:
          this.getNum("1", this.fieldId, this.latexId);
          break;
        case 1:
          this.getNum("2", this.fieldId, this.latexId);
          break;
        case 2:
          this.getNum("3", this.fieldId, this.latexId);
          break;
        case 3:
          this.getNum("4", this.fieldId, this.latexId);
          break;
        case 4:
          this.getNum("5", this.fieldId, this.latexId);
          break;
        case 5:
          this.getNum("6", this.fieldId, this.latexId);
          break;
        case 6:
          this.getNum("7", this.fieldId, this.latexId);
          break;
        case 7:
          this.getNum("8", this.fieldId, this.latexId);
          break;
        case 8:
          this.getNum("9", this.fieldId, this.latexId);
          break;
        case 9:
          this.getNum("0", this.fieldId, this.latexId);
          break;
        case 10:
          this.getNum(".", this.fieldId, this.latexId);
          break;
        case 11:
          this.getNum("+", this.fieldId, this.latexId);
          break;
        case 12:
          this.getNum("-", this.fieldId, this.latexId);
          break;
        case 13:
          this.getNum("\\pm", this.fieldId, this.latexId);
          break;
        case 14:
          this.getNum("\\ge", this.fieldId, this.latexId);
          break;
        case 15:
          this.getNum("\\le", this.fieldId, this.latexId);
          break;
        case 16:
          this.getNum("\\gt", this.fieldId, this.latexId);
          break;
        case 17:
          this.getNum("\\lt", this.fieldId, this.latexId);
          break;
        case 18:
          this.getNum("\\times", this.fieldId, this.latexId);
          break;
        case 19:
          this.getNum("\\div", this.fieldId, this.latexId);
          break;
          case 20:
          this.getNum("\\left(\\right)", this.fieldId, this.latexId);
          break;
        
        case 21:
          this.getNum("\\sqrt[]{}", this.fieldId, this.latexId);
          break; //根号
        case 22:
          this.getNum("\\sqrt{}", this.fieldId, this.latexId);
          break; //二次根式
        case 23:
          this.getNum("\\^{}", this.fieldId, this.latexId);
          break; //次方
        case 24:
          this.getNum("\\^{2}", this.fieldId, this.latexId);
          break; //二次方
        case 25:
          this.getNum("|", this.fieldId, this.latexId);
          setTimeout(() => {
            this.getNum("|", this.fieldId, this.latexId);
          });
          break; //绝对值
        case 26:
          //   this.Mathmessage += "\\frac{ }{ }";
          this.getNum("\\frac{}{}", this.fieldId, this.latexId);
          break; //几分之几
        case 27:
          //   this.Mathmessage += "\\pi";
          this.getNum("\\pi", this.fieldId, this.latexId);
          break;
        case 28:
          //   this.Mathmessage += "&perp;";
          this.getNum("\\bot", this.fieldId, this.latexId);
          break;
        case 29:
          this.getNum("/", this.fieldId, this.latexId);
          setTimeout(() => {
            this.getNum("/", this.fieldId, this.latexId);
          });
          break;
        case 30:
          this.getNum("A", this.fieldId, this.latexId);
          break;
        case 31:
          this.getNum("B", this.fieldId, this.latexId);
          break;
        case 32:
          this.getNum("C", this.fieldId, this.latexId);
          break;
        case 33:
          this.getNum("D", this.fieldId, this.latexId);
          break;
        case 34:
          this.getNum("E", this.fieldId, this.latexId);
          break;
        case 35:
          this.getNum("F", this.fieldId, this.latexId);
          break;
        case 36:
          this.getNum("G", this.fieldId, this.latexId);
          break;
        case 37:
          this.getNum("H", this.fieldId, this.latexId);
          break;
        case 38:
          this.getNum("I", this.fieldId, this.latexId);
          break;
        case 39:
          this.getNum("J", this.fieldId, this.latexId);
          break;
        case 40:
          this.getNum("K", this.fieldId, this.latexId);
          break;
        case 41:
          this.getNum("L", this.fieldId, this.latexId);
          break;
        case 42:
          this.getNum("M", this.fieldId, this.latexId);
          break;
        case 43:
          this.getNum("N", this.fieldId, this.latexId);
          break;
        case 44:
          this.getNum("O", this.fieldId, this.latexId);
          break;
        case 45:
          this.getNum("P", this.fieldId, this.latexId);
          break;
        case 46:
          this.getNum("Q", this.fieldId, this.latexId);
          break;
        case 47:
          this.getNum("R", this.fieldId, this.latexId);
          break;
        case 48:
          this.getNum("S", this.fieldId, this.latexId);
          break;
        case 49:
          this.getNum("T", this.fieldId, this.latexId);
          break;
        case 50:
          this.getNum("U", this.fieldId, this.latexId);
          break;
        case 51:
          this.getNum("V", this.fieldId, this.latexId);
          break;
        case 52:
          this.getNum("W", this.fieldId, this.latexId);
          break;
        case 53:
          this.getNum("X", this.fieldId, this.latexId);
          break;
        case 54:
          this.getNum("Y", this.fieldId, this.latexId);
          break;
        case 55:
          this.getNum("Z", this.fieldId, this.latexId);
          break;
      }
    },
    submit() {
      this.$emit("update:showKeyCode", false);
    },
    deleteKey() {
      this.mathField.keystroke('Backspace');
    },
    getNum(Mathmessage, fieldId, latexId) {
      var mathFieldSpan = document.getElementById(fieldId);
      var latexSpan = document.getElementById(latexId);
      var MQ = MathQuill.getInterface(2);
      var mathField = this.mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true, // an example config option, for more see:
        //   http://docs.mathquill.com/en/latest/Config/
        handlers: {
          edit: function () {
            // retrieve, in LaTeX format, the math that was typed:
            latexSpan.textContent = mathField.latex();
          },
        },
      });
      mathField.write(Mathmessage);
      mathField.focus();
    },
  },
  watch: {
    // fieldId: function (val) {
    //   this.getNum("", this.fieldId, this.latexId);
    // },
    latexId: function (val) {
      this.getNum("", this.fieldId, this.latexId);
    },
  },
};
</script>

<style lang="scss" scoped>

.delete {
  right: 26px !important;
}
// .keybord::after {
//   position: absolute;
//   content: "";
//   width: 0;
//   height: 0;
//   border-top: 10px solid transparent;
//   border-right: 10px solid transparent;
//   border-bottom: 10px solid #ffffff;
//   border-left: 10px solid transparent;
//   top: -20px;
//   left: 50%;
//   margin-left: -5px;
// }
.keybord {
  top: 50px;
  position: absolute;
  padding: 24px;
  width: 512px;
  height: 360px;
  border-radius: 12px;
  box-shadow: 0px 0px 13px 0px rgba(230, 230, 230, 1);
  background: #ffffff;
  z-index: 100000;
  div {
    img {
      width: 32px;
      height: 32px;
      margin-right: 16px;
      margin-bottom: 11px;
      cursor: pointer;
    }
    img:nth-child(10n) {
      margin-right: 0;
    }
    img:nth-child(51) {
      margin-bottom: 0;
    }
    img:nth-child(52) {
      margin-bottom: 0;
    }
    img:nth-child(53) {
      margin-bottom: 0;
    }
    img:nth-child(54) {
      margin-bottom: 0;
    }
    img:nth-child(55) {
      margin-bottom: 0;
    }
    img:nth-child(56) {
      margin-bottom: 0;
    }
  }
  .changeA {
    position: absolute;
    padding: 10px 15px;
    background: rgba(239, 239, 239, 1);
    border-radius: 20px;
    font-size: 13px;
    text-align: center;
    font-weight: bold;
    color: #666666;
    bottom: 70px;
    right: 109px;
    cursor: pointer;
  }
  .changeA:hover {
    background: #24a2ff;
    color: #ffffff;
  }
  .submit {
    position: absolute;
    border-radius: 20px;
    background: #28a1ff;
    font-size: 13px;
    padding: 9px 19px;
    color: #ffffff;
    left: 50%;
    bottom: 20px;
    margin-left: -20px;
    cursor: pointer;
  }
  .close {
    right: 30px;
  }
}
// .optionDiv {
//   width: 150px;
//   height: 40px;
//   background: rgba(255, 255, 255, 1);
//   border: 1px solid rgba(204, 204, 204, 1);
//   border-radius: 15px;
//   outline: 0;
//   padding: 10px 15px;
//   // margin: 0 auto;
//   display: flex;
//   align-items: center;
//   position: relative;
// }
</style>