import express from "express";
import { prisma } from "../modules/index.js";
import { verificationToken } from "../middlewares/middleware.js";

const router = express.Router();

// 게시물 좋아요
router.post('/resume/:resumeId/like', verificationToken, async (req,res,next) => {
    const {resumeId} = req.params;
    const { userId } = req.user;

    const resume = await prisma.resumes.findFirst({where : {resumeId : +resumeId}})
    if (!resume) {
        return res.status(404).json({ message: "이력서 조회에 실패하였습니다." });
    }

    const duplication = await prisma.Likes.findFirst({where : {userId : +userId, resumeId : resume.resumeId}})
    if (duplication) {
        return res.status(409).json({ message : "이미 좋아요를 누른 게시물입니다." })
    }

    const like = await prisma.Likes.create({
        data : {
            userId : +userId,
            resumeId : resume.resumeId
        }
    })

    await prisma.resumes.update({
        where : resume,
        data : {
            countlike : {
                increment: 1
            }
        }
    })

    return res.status(201).json({message : "좋아요", like});
})

// 게시물에 좋아요 취소
router.delete('/resume/:resumeId/like', verificationToken, async (req,res,next) => {
    const {resumeId} = req.params;
    const {userId} = req.user;

    const resume = await prisma.resumes.findFirst({where : {resumeId : +resumeId}})
    if (!resume) {
        return res.status(404).json({ message: "이력서 조회에 실패하였습니다." });
    }

    const likePost = await prisma.Likes.findFirst({where : {resumeId : +resumeId, userId : +userId}});
    if (!likePost) {
        return res.status(404).json({ message: "해당 게시물에 좋아요를 누른적이 없습니다." });
    }

    await prisma.Likes.delete({where : likePost})

    await prisma.resumes.update({
        where : resume,
        data : {
            countlike : {
                decrement: 1
            }
        }
    })

    return res.status(200).json({ message: "좋아요 취소." });
})

// 좋아요 누른 게시물 조회
router.get('/resumes/like', verificationToken, async (req,res,next) => {
    const {userId} = req.user;

    const likes = await prisma.Likes.findMany({
        where : {
            userId : +userId
        }, 
        orderBy : {
            createdAt : 'desc'
        }
    });
    console.log(likes);

    const resumes = await prisma.resumes.findMany({
        where : {
            resumeId : {in : likes.map((like) => like.resumeId)}
        }
    });
    console.log(likes.map((like) => like.resumeId))

    if (resumes.length < 1) {
        return res.status(404).json({ message: "좋아요를 누른 게시물이 없습니다." }); 
    }

    return res.status(200).json({date : resumes});
})

export default router;