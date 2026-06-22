import { gql } from "@apollo/client";

export const cmsPostReact = gql`
  mutation CpPostsReact($id: String!, $reaction: PostReactionType!, $action: ReactionModifyType!) {
    cpPostsReact(_id: $id, reaction: $reaction, action: $action) {
      _id
    }
  }
`;

const mutations = {
  cmsPostReact,
};
export default mutations;