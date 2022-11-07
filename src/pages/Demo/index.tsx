import type { FC } from 'react'
import { connect } from "react-redux";
import { getDemoData } from "./store/reducer";
import { Helmet } from "react-helmet";

interface IProps {
  content?: string;
  getDemoData?: (data: string) => void;
}
const Demo: FC<IProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>简易的服务器端渲染框架 - DEMO</title>
        <meta name="description" content="服务器端渲染框架"></meta>
      </Helmet>
      <div>
        <h1>{props.content}</h1>
          <button
            onClick={(): void => {
              props.getDemoData?.("刷新过后的数据")
            }}
          >
            刷新
          </button>
      </div>
    </>
    
  );
};

const mapStateToProps = (state: any)=>{
  return {
    content: state?.demo?.content
  }
}
const mapDispatchToProps = (dispatch: any)=>{
  return {
    getDemoData(arg:string){
      return dispatch(getDemoData(arg))
    }
  }
}
const withDemo : any = connect(mapStateToProps, mapDispatchToProps)(Demo)

withDemo.getInitProps = (store: any, data?: string) => {
  return store.dispatch(getDemoData(data || "这是初始化的demo"));
};
export default withDemo;