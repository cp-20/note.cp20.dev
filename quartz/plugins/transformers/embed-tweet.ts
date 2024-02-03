import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root } from "hast"

// @ts-ignore
import embedTweetScript from "../../components/scripts/embed-tweet.inline.js"

export const EmbedTweet: QuartzTransformerPlugin = () => {
  return {
    name: "EmbedTweet",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "element", (node, _index, _parent) => {
              if (node.tagName !== "img") return
              if (!node.properties) return
              if (typeof node.properties.src !== "string" || node.properties.src === "") return
              if (!/https:\/\/twitter.com\/.+/.test(node.properties.src)) return

              const tweetId = new URL(node.properties.src).pathname.split("/").pop() as string
              const id = `twitter-tweet-${tweetId}-${Math.random().toString(36).substring(7)}`

              node.tagName = "div"
              node.properties = {}
              node.children = [
                {
                  type: "element",
                  tagName: "div",
                  properties: { id, "data-twee-id": tweetId, class: "tweet-embed" },
                  children: [],
                },
              ]
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        js: [
          {
            script: embedTweetScript as string,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
      }
    },
  }
}
