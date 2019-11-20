<template>
  <v-content class="grey lighten-3">
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </div>

    <!-- 消息提示框 -->
    <v-snackbar
      style="margin-top:100px;margin-right:20px;"
      v-model="NoticeInfo.show"
      :timeout="0"
      :top="true"
      :right="true"
      :color="NoticeInfo.color.bgcolor"
    >
      <span :class="NoticeInfo.color.textcolor">{{ NoticeInfo.message }}</span>
      <v-btn :color="NoticeInfo.color.closecolor" text @click="hideNotice">&times;</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "CoreView",

  computed: { ...mapGetters(["NoticeInfo", "UserInfo"]) },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["getUserInfo"]),
    ...mapMutations(["hideNotice"])
  },
  mounted() {
    // this.getUserInfo()
  },
};
</script>
