import { Button, Comment, Form, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";
import { CommentType } from "../../types/product-service.type";

const MyComment = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [refComments, setRefComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isRef, setIsRef] = useState<{ ref: string; user: string } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const productState = useAppSelector((state) => state.product);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getComments = async () => {
      if (!productState.selectedProduct.id) return;
      setLoading(true);
      try {
        const { data } = await productService.getCommentsByProductId(
          productState.selectedProduct.id
        );
        setComments(data.filter((c) => !c.ref));
        setRefComments(data.filter((c) => c.ref));
      } catch (error: any) {
        dispatch(
          setNotification({
            message: "Hata",
            description: error.response?.data.message,
            isNotification: true,
            placement: "top",
            status: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    if (productState.selectedProduct.id) {
      getComments();
    }
  }, [productState.selectedProduct.id, dispatch]);

  useEffect(() => {
    if (isRef) {
      setNewComment(`@${isRef.user} -`);
    } else {
      const com = newComment.substring(
        newComment.indexOf("-") + 1,
        newComment.length
      );
      setNewComment(com);
    }
  }, [isRef]);

  const pic = (picture: string | null, char: string) => (
    <div className="w-8 h-8 rounded-full bg-white mr-4 flex justify-center items-center">
      {picture !== null ? (
        <img
          src={picture}
          alt="pic"
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <span>{char}</span>
      )}
    </div>
  );

  const handleSubmit = async () => {
    if (newComment.trim().length < 1) return;
    try {
      setSubmitting(true);
      let com = newComment;
      if (isRef) {
        com = newComment.substring(
          newComment.indexOf("-") + 1,
          newComment.length
        );
      }
      const { data } = await productService.createComment({
        comment: com,
        productId: productState.selectedProduct.id,
        ref: isRef !== null ? isRef.ref : undefined,
      });
      if (data.ref) {
        setRefComments([data, ...refComments]);
        setIsRef(null);
      } else {
        setComments([data, ...comments]);
      }
      setNewComment("");
    } catch (error) {
      dispatch(
        setNotification({
          message: "Üzgünüz",
          description: "Mesajınız yollanırken bir hata oluştu.",
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      {comments.length < 1 ? (
        <span>Henür bir yorum yok.</span>
      ) : (
        <>
          {comments.map((comment) => {
            if (comment.ref) return <></>;
            let isUserBuy = userState.evaluateProducts.find(
              (el) => el.userId === comment.userId.id && productState.selectedProduct.id === el.productId
            );
            const name = userState.user.id === comment.userId.id ? "Siz" : comment.userId.firstName.concat(
              " ",
              comment.userId.lastName
            );
            return (
              <>
                
              <Comment
                key={comment.id}
                // isRef Tüm commentlerin tutulduğu componentin state i o yüzden or sorgusu konuldu.
                actions={[
                  <>
                    {isRef === null || (isRef !== null && isRef.ref !== comment.id) ? (
                      <span
                        onClick={() =>
                          setIsRef({ ref: comment.id, user: name })
                        }
                      >
                        Yanıtla
                      </span>
                    ) : (
                      <span onClick={() => setIsRef(null)}>Vazgeç</span>
                    )}
                  </>,
                ]}
                datetime={moment(comment.createdAt).format("DD/MM/YYYY | HH:mm")}
                author={
                  <span className="!text-secondary !text-base font-semibold">
                    {name}
                    {"\t"}
                    {isUserBuy && (
                      <span className="text-thirdy text-xs">
                        Satın Alanlardan
                      </span>
                    )}
                  </span>
                }
                avatar={pic(
                  comment.userId.profilePicture,
                  comment.userId.firstName.charAt(0).toUpperCase()
                )}
                content={<span className="pl-2 text-black text-base">{comment.comment}</span>}
              >
                {refComments.map((c) => {
                  if (c.ref === comment.id) {
                    const refUsername = userState.user.id === comment.userId.id ? "Siz" : comment.userId.firstName.concat(
                      " ",
                      comment.userId.lastName
                    );
                    return (
                      <Comment
                        author={
                          <span className="!text-primary !text-base font-semibold">
                            {refUsername}
                            {"\t"}
                            {isUserBuy && "Satın Alanlardan"}
                          </span>
                        }
                        datetime={moment(comment.createdAt).format("DD/MM/YYYY | HH:mm")}
                        avatar={pic(
                          c.userId.profilePicture,
                          c.userId.firstName.charAt(0).toUpperCase()
                        )}
                        content={<span className="pl-2 text-black text-base">{c.comment}</span>}
                      />
                    );
                  }
                  return <></>;
                })}
              </Comment>
              <div className="border-b" />
              </>
            );
          })}
        </>
      )}
      <Comment
        avatar={pic(
          userState.user.profilePicture,
          userState.user.firstName.charAt(0).toUpperCase()
        )}
        content={
          <>
            <TextArea
              rows={4}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
            <Button
              loading={submitting}
              onClick={handleSubmit}
              type="primary"
              className="mt-3"
            >
              Yorum Yap
            </Button>
          </>
        }
      />
    </div>
  );
};

export default MyComment;
