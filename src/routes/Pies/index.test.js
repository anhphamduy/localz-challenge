import React from "react";
import { shallow } from "enzyme";
import Pies from "./index";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("<Pies />", async () => {
  const tree = shallow(<Pies />);
  const treeInstance = tree.instance()
  // test blank tree
  expect(treeInstance).toMatchSnapshot();

  // test tree data
  await Promise.resolve(treeInstance.fetch(
    {
      showSizeChanger: true,
      current: 1,
      total: 1,
      pageSizeOptions: ["5", "10", "15"],
      defaultPageSize: 5
    },
    undefined,
    {}
  ))
  expect(treeInstance).toMatchSnapshot();

  // test another tree data
  await Promise.resolve(treeInstance.fetch(
    {
      showSizeChanger: true,
      current: 2,
      total: 3,
      pageSizeOptions: ["5", "10", "15"],
      defaultPageSize: 10
    },
    undefined,
    {}
  ))
  expect(treeInstance).toMatchSnapshot();
});
