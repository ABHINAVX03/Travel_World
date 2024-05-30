import React, { useContext, useState ,useEffect} from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import emailjs from "@emailjs/browser";
const NewsLetter = () => {

  const { user, dispatch } = useContext(AuthContext);
  const [email,setemail]=useState('')
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();

  const handleSubmit = async () => {
    const serviceId = "service_szn9mz7";
    const templateId = "template_a86h1qs";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name: email.slice(-email.length,-10),
        recipient: email
      });
      toast({
        title:"Email send Successfully!",
        isClosable:true,
        duration:6000,
        position:'bottom'
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => emailjs.init("-8AywI-tc_J2nq4CV"), []);
  return user ? (
    <></>
  ) : (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information</h2>

              <div className="newsletter__input">
                <input type="email" style={{width:'100%'}} placeholder="Enter your email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <button className="btn newsletter__btn" onClick={handleSubmit} disabled={loading}>
                  Subscribe
                </button>
                </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati adipisici sunt in, provident facere ipsam
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
