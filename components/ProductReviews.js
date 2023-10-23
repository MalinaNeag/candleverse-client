import styled from "styled-components";
import Input from "@/components/Input";
import WhiteBox from "@/components/WhiteBox";
import StarsRating from "@/components/StarsRating";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #555;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid #eee;
  padding: 20px 0;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }

  h3 {
    margin: 10px 0;
    font-size: 1.2rem;
    color: #333;
    font-weight: bold;
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4rem;
    color: #555;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;

  time {
    font-size: 1rem;
    color: #aaa;
  }
`;

const AddReviewBox = styled(WhiteBox)`
  background-color: #f9f9f9;
  padding: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  div {
    margin-top: 20px;
  }
`;

const ReviewList = styled(WhiteBox)`
  background-color: #f9f9f9;
  padding: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const NoReviewsMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  function submitReview() {
    const data = { title, description, stars, product: product._id };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
      <div>
        <Title>Product Reviews</Title>
        <ColsWrapper>
          <div>
            <AddReviewBox>
              <Subtitle>Add a Review</Subtitle>
              <div>
                <StarsRating onChange={setStars} />
              </div>
              <Input
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                  placeholder="Title"
              />
              <Textarea
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                  placeholder="Your review here..."
              />
              <div>
                <Button primary onClick={submitReview}>
                  Submit Your Review
                </Button>
              </div>
            </AddReviewBox>
          </div>
          <div>
            <ReviewList>
              <Subtitle>All Reviews</Subtitle>
              {reviewsLoading ? (
                  <Spinner fullWidth={true} />
              ) : reviews.length === 0 ? (
                  <NoReviewsMessage>No reviews yet.</NoReviewsMessage>
              ) : (
                  reviews.map((review, index) => (
                      <ReviewWrapper key={review._id}>
                        <ReviewHeader>
                          <StarsRating
                              size="sm"
                              disabled={true}
                              defaultHowMany={review.stars}
                          />
                          <time>{new Date(review.createdAt).toLocaleString("sv-SE")}</time>
                        </ReviewHeader>
                        <h3>{review.title}</h3>
                        <p>{review.description}</p>
                      </ReviewWrapper>
                  ))
              )}
            </ReviewList>
          </div>
        </ColsWrapper>
      </div>
  );
}
