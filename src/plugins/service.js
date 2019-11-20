// import store from "../store"
import axios from "axios"
import md5 from "js-md5"

const virtualData = true

const data = {
	//example
	dataName: {
		key: "value"
	},
	Login: {

	},
	ProposalDetail: {
		//id
		id: "123",
		//提案阶段
		proposalStage: "提案阶段",
		//提案名称
		proposalTitle: "提案名称",
		//提案分类
		proposalType: "提案分类",
		//提案人姓名
		proposerName: "提案人姓名",
		//提案人工号
		proposerNumber: "提案人工号",
		//提案人联系电话
		proposerPhone: "提案人联系电话",
		//所属代表团
		proposerDelegation: "所属代表团",
		//提案事由
		proposalReason: "提案事由",
		//提案建议或措施
		proposalSuggest: "提案建议或措施",
		//提案附图1地址
		attachingPicture1Address: "",
		//提案附图2地址
		attachingPicture2Address: "",
		//提案附图3地址
		attachingPicture3Address: "",
		//提案其他附件地址
		otherAttachmentsAddress: "",
		//提案时间
		proposalTime: "Date-提案时间",
		//附议人数
		proposalSeconderCount: "Integer-附议人数",
		//提案性质
		proposalNature: "提案性质",
		//所处状态
		proposalStatus: "所处状态",
		//审核人
		proposalReviewer: "审核人",
		//审核时间
		proposalReviewTime: "Date-审核时间",
		//校办会签意见
		schoolOfficeCountersignView: "校办会签意见",
		//承办部门
		undertakeDepartment: "承办部门",
		//办理人
		proposalHandlerName: "办理人",
		//办理人工号
		proposalHandlerNumber: "办理人工号",
		//办理意见
		proposalHandleOpinions: "办理意见",
		//办理时间
		proposalHandleTime: "Date-办理时间",
		//主管校领导意见
		supervisorSchoolLeaderOpinions: "主管校领导意见",
		//提案人反馈意见
		proposerFeedbackOpinions: "提案人反馈意见",
		//是否立案
		putOnRecord: "是否立案",
		//立案编号
		putOnRecordNumber: "立案编号",
		//建议部门
		suggestDepartment: "建议部门",
		//建议部门意见
		suggestDepartmentOpinions: "建议部门意见",
		//提案人是否阅读
		proposerRead: "Boolean-提案人是否阅读",
		//承办状态
		undertakeStatus: "承办状态",
		//当前处理人
		currentProcessingPersonName: "当前处理人",
		//当前处理人工号
		currentProcessingPersonNumber: "当前处理人工号",
		//提案组审定结果
		proposalGroupValidationResults: "Boolean-提案组审定结果",
		//附议人
		proposalSeconder: "附议人",
		//团长审核情况
		opinionOfTheDelegationHead: "Boolean-团长审核情况",
		//提案是否圆满结束
		proposalEnd: "Boolean-提案是否圆满结束",
		//校领导
		schoolLeader: "校领导",
		//摘要
		summary: "摘要",
		//提案组审定意见
		proposalGroupValidationSuggestion: "提案组审定意见",
		//创建时间
		create_time: "Date-创建时间",
		//是否保存为正式提案
		saved: "Boolean-是否保存为正式提案"
	}
}

export default {
	//example

	FuncName: async (listarg, arg1, arg2) => {
		if (virtualData)
			return data.dataName
		const res = await axios.post("/api/xxx", {
			listarg: JSON.stringify(listarg),
			arg1: arg1,
			arg2: arg2
		})
		if (res.data.code == "0")
			return res.data.data
		else
			return false
	},


	Login: async (id, password) => {
		// console.log("Login...", id, password)
		// if (virtualData)
		console.log(md5(id))
		//     return data.Login
		const res = await axios.post("/api/login", {
			email: md5(id),
			password: md5(password)
		})
		console.log('service', res)
		if (res.code == "000001") {
			return res
		}
		else
			return false
	},


}