import { Button, Comment, Form, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";
import { CommentType } from "../../types/product-service.type";

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value?: string;
}

const MyComment = () => {
  const [comments, setComments] = useState<CommentType[]>([
    {
      comment:
        "jkhsadbkjsa askjhbdkashjd asljdnajsd asljhdbnsajd lashjbdnjaslkd ashjbdnasjnd asljdblasjknd asldjhbasldhj ldhbafhh fsuılfhoıus fhmosuıfho ıufnh osıufn nhsunıf hnsfnnh sındf hsd fuhdsmuy fmhsdfu ygdsh yfgdsfdshb hbs dhjbf mfbdh msdg vfg dvfnds fvsfyv sbyefvs fgehb",
      createdAt: new Date(),
      id: "ahsgdkhjald",
      productId: "askjhdbnsd",
      userId: {
        id: "asdşksad",
        firstName: "Sezer",
        lastName: "Kenar",
        profilePicture: null,
      },
    },
  ]);
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
      } else {
        setComments([data, ...comments]);
      }
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
              (el) => el.userId === comment.userId.id
            );
            const name = comment.userId.firstName.concat(
              " ",
              comment.userId.lastName
            );
            return (
              <Comment
                actions={[
                  <>
                    {isRef === null ? (
                      <span
                        onClick={() =>
                          setIsRef({ ref: comment.productId, user: name })
                        }
                      >
                        Yanıtla
                      </span>
                    ) : (
                      <span onClick={() => setIsRef(null)}>Vazgeç</span>
                    )}
                  </>,
                ]}
                datetime={moment(comment.createdAt).format("DD/MM/YYYY HH:mm")}
                author={
                  <span className="!text-primary !text-base ">
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
                content={<span>{comment.comment}</span>}
              >
                {refComments.map((c) => {
                  if (c.ref === comment.productId) {
                    return (
                      <Comment
                        author={
                          <span className="!text-primary !text-base">
                            {c.userId.firstName.concat(" ", c.userId.lastName)}
                            {"\t"}
                            {isUserBuy && "Satın Alanlardan"}
                          </span>
                        }
                        avatar={pic(
                          c.userId.profilePicture,
                          c.userId.firstName.charAt(0).toUpperCase()
                        )}
                        content={<span>{c.comment}</span>}
                      />
                    );
                  }
                  return <></>;
                })}
              </Comment>
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
