import { gql } from "@apollo/client";

export const cmsPostList = gql`
  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
    $limit: Int
    $cursor: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
      limit: $limit
      cursor: $cursor
    ) {
      totalCount
      posts {
        _id
        slug
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        thumbnail {
          url
        }
        categoryIds
        categories {
          _id
          name
        }
        tagIds
        tags {
          _id
          name
        }
        images {
          url
          type
          name
        }
        video { 
          url
        }
        videoUrl
        authorKind
        author {
          ... on User {
            userId: _id
            username
            email
            details {
              fullName
              avatar
            }
          }
        }
      }
    }
  }
`;
export const cmsPostDetail = gql`
query cpPost($id: String, $slug: String) {
  cpPost(_id: $id, slug: $slug) {
    _id
    type
    clientPortalId
    title
    slug
    content
    excerpt
    categoryIds
    status
    tagIds
    authorId
    featured
    featuredDate
    scheduledDate
    autoArchiveDate
    reactions
    reactionCounts
    thumbnail {
      url
      type
      name
      __typename
    }
    images {
      url
      type
      name
      __typename
    }
    video {
      url
      type
      name
      __typename
    }
    audio {
      url
      type
      name
      __typename
    }
    documents {
      url
      type
      name
      __typename
    }
    attachments {
      url
      type
      name
      __typename
    }
    pdfAttachment {
      pages {
        url
        name
        type
        size
        duration
        __typename
      }
      __typename
    }
    videoUrl
    createdAt
    updatedAt
    authorKind
    author {
      ... on User {
        userId: _id
        username
        email
        details {
          fullName
          shortName
          avatar
          firstName
          lastName
          middleName
          __typename
        }
        __typename
      }
      __typename
    }
    categories {
      _id
      name
      slug
      __typename
    }
    tags {
      _id
      name
      __typename
    }
    customFieldsData
    __typename
  }
}
`;
export const cmsCategoryList = gql`
  query CpCategories($clientPortalId: String, $language: String) {
  cpCategories(clientPortalId: $clientPortalId, language: $language) {
    list {
      _id
      clientPortalId
      name
      slug
      description
      parentId
      status
      createdAt
      updatedAt
      customFieldsData
      customFieldsMap
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
`;
export const cmsMenuList = gql`
  query CpCmsMenuList($kind: String, $limit: Int, $orderBy: JSON) {
    cpCmsMenuList(kind: $kind, limit: $limit, orderBy: $orderBy) {
      _id
      parentId
      webId
      label
      kind
      url
      order
      target
      translations {
        _id
        content
        customFieldsData
        title
        type
      }
    }
  }
`;
export const cmsAdList = gql`
  query AdList($categoryIds: [String]) {
    cpPostList(categoryIds: $categoryIds) {
      posts {
        _id
        videoUrl
        thumbnail {
          url
        }
      }
    }
  }
`;

export const cmsPost = gql`
  query CmsPost($id: String, $slug: String, $identifier: String, $language: String) {
    cmsPost(_id: $id, slug: $slug, identifier: $identifier, language: $language) {
      recentViewCount
      reactions
      reactionCounts
    }
  }
`;


const queries = {
  cmsPostList,
  cmsPostDetail,
  cmsCategoryList,
  cmsMenuList,
  cmsAdList,
  cmsPost,
};
export default queries;