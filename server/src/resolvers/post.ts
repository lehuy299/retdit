
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CreatePostInput } from "../types/CreatePostInput";
import { PostMutationResponse } from "../types/PostMutationResponse";
import { Post } from "../entities/Post";
import { UpdatePostInput } from "../types/UpdatePostInput";
import { Context } from "../types/Context";
import { AuthenticationError } from "apollo-server-core";
import { checkAuth } from "../middleware/checkAuth"

@Resolver()
export class PostResolver {
    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)
    async createPost(
        @Arg('createPostInput') { title, text }: CreatePostInput
    ): Promise<PostMutationResponse> {
        try {
            const newPost = Post.create({
                title,
                text
            })

            await newPost.save()
            return {
                code: 200,
                success: true,
                message: 'Post create successfully',
                post: newPost
            }
        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error.message}`,
            }
        }
    }

    @Query(_return => [Post], {nullable: true})
    async posts(): Promise<Post[] | null> {
        try {
            return await Post.find()    
        } catch (error) {
            return null
        }
        
    }

    @Query(_return => Post, {nullable: true})
    async post(
        @Arg('id', _type => ID) id: number
    ): Promise<Post | null> {
        try {
            const post = await Post.findOneBy({id})
            return post
        } catch (error) {
            return null
        }
    }

    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)
    async updatePost(
        @Arg('updatePostInput') { id, title, text }: UpdatePostInput
    ): Promise<PostMutationResponse> {
        const existingPost = await Post.findOneBy({id})
        if (!existingPost) {
            return {
                code: 400,
                success: false,
                message: 'Post not found'
            }
        }

        existingPost.title = title
        existingPost.text = text

        await existingPost.save()

        return {
            code: 200,
            success: true,
            message: 'Post updated successfully',
            post: existingPost
        }
    }

    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)
    async deletePost(
        @Arg('id', _type => ID) id: number,
        @Ctx() { req }: Context
    ): Promise<PostMutationResponse> {
        if (!req.session.userId) {
            throw new AuthenticationError('Not authenticated to perform GraphQL operations')
        }
        
        const existingPost = await Post.findOneBy({id})
        if (!existingPost) {
            return {
                code: 400,
                success: false,
                message: 'Post not found'
            }
        }
        await Post.delete({id})

        return {
            code: 200,
            success: true,
            message: 'Post deleted successfully'
        }
    }
}