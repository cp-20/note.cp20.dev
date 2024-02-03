import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root } from "hast"

export const ImgAltToDescription: QuartzTransformerPlugin = () => {
  return {
    name: "ImgAltToDescription",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "element", (node, _index, parent) => {
              if (node.tagName !== "img") return
              if (!node.properties) return
              if (typeof node.properties.alt !== "string" || node.properties.alt === "") return

              const caption = node.properties.alt

              if (parent?.type === "element" && parent.tagName === "p") {
                parent.tagName = "figure"
                parent.properties = {
                  class: "img-container",
                }
                parent.children = [
                  node,
                  {
                    type: "element",
                    tagName: "figcaption",
                    properties: {
                      class: "img-caption",
                    },
                    children: [
                      {
                        type: "text",
                        value: caption,
                      },
                    ],
                  },
                ]
              }
            })
          }
        },
      ]
    },
  }
}
