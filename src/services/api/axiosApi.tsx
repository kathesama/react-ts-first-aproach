import axios from 'axios';
import { getPostUserUrl } from "@/utilities/routes";
import { UserInfo } from "@/models/UserInfo";

export default axios.create({
  baseURL: '',
});

export const postUser = (user: UserInfo) => axios.post(getPostUserUrl(), user);

