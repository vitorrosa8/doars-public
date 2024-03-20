package br.com.ifrs.ssi.tcc.api.controller;

import br.com.ifrs.ssi.tcc.api.controller.request.CommentPostRequest;
import br.com.ifrs.ssi.tcc.api.controller.request.PostRequest;
import br.com.ifrs.ssi.tcc.api.controller.response.PostResponse;
import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import br.com.ifrs.ssi.tcc.api.service.post.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    MakePostService makePostService;

    @Autowired
    ListUsersPostService listUsersPostService;

    @Autowired
    ListAllPostsService listAllPostsService;

    @Autowired
    ListInstitutionPostService listInstitutionPostService;

    @Autowired
    LikePostService likePostService;

    @Autowired
    CommentPostService commentPostService;

    @Autowired
    SharePostService sharePostService;

    @Autowired
    ListPostsByCategoryService listPostsByCategoryService;

    @Autowired
    GetPostByIdService getPostByIdService;

    @Autowired
    ListFollowedPostsService listFollowedPostsService;

    @PostMapping
    public void make(@Valid @RequestBody PostRequest request) {
        makePostService.make(request);
    }

    @GetMapping("/user/{userId}")
    public Page<PostResponse> listUserPosts(@PathVariable Long userId, Pageable pageable) {
        return listUsersPostService.list(userId, pageable);
    }

    @GetMapping("/all")
    public Page<PostResponse> listAllPosts(Pageable pageable) {
        return listAllPostsService.listAllPosts(pageable);
    }

    @GetMapping("/followed")
    public Page<PostResponse> listFollowedPosts(Pageable pageable) {
        return listFollowedPostsService.list(pageable);
    }

    @GetMapping
    public Page<PostResponse> listInstitutionPosts(Pageable pageable) {
        return listInstitutionPostService.list(pageable);
    }

    @GetMapping("/category/{category}")
    public Page<PostResponse> listPostsByCategoory(@PathVariable DonationType category, Pageable pageable) {
        return listPostsByCategoryService.listPostsByCategory(category, pageable);
    }

    @PostMapping("/like/{postId}")
    public void likePost(@PathVariable Long postId) {
        likePostService.like(postId);
    }

    @PostMapping("/comment/{postId}")
    public void commentPost(@PathVariable Long postId, @RequestBody CommentPostRequest request) {
        commentPostService.comment(postId, request);
    }

    @GetMapping("share/{postId}")
    public String getSharedPost(@PathVariable Long postId){
        return sharePostService.share(postId);
    }


    @GetMapping("shared/{postId}")
    public PostResponse getPostById(@PathVariable Long postId){
        return getPostByIdService.getPostById(postId);
    }


}
