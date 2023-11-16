import moment from "moment";

export const convertToTableJobData = (data) => {
	const result = data.map((item) => ({
		id: item.id,
		title: item.title,
		job_desc: item.job_desc,
		requirement: item.requirement,
		logo: item.logo,
		quota: item.quota,
		applicant: item.applicant,
		job_type: item.jobType?.job_type,
		job_experience: item.jobExperience?.exp_desc,
		job_position: item.jobPosition?.position_name,
		createdAt: moment(item.createdAt).subtract(10, "days").calendar(),
		closedAt: moment(item.closedAt).subtract(10, "days").calendar(),
	}));
	return result;
};

export const convertToTableApplicationData = (data) => {
	const items = data.filter((item) => item.status === "Pending");

	return items;
};
