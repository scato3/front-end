import reactDom from "react-dom";
interface Props {
  children: React.ReactNode;
}
export default function ModalPortal({ children }: Props) {
  // ssr일떄는 해주지 않기 위해서
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal") as Element;
  return reactDom.createPortal(children, node);
}
