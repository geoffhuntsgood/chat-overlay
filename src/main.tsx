import { parseEmotes } from "emotettv";
import tmi from "tmi.js";
import "./index.css";

let messages: string[] = [];

const params = new URLSearchParams(document.location.search);
const channelParam = params.get("channel");
const fontParam = params.get("font");

const client = new tmi.Client({
  channels: [channelParam ? channelParam : "TheGeoffinitiveEdition"]
});

client.connect();

client.on("message", async (_, tags, text) => {
  const message = await parseEmotes(text, tags.emotes);
  const name = tags["display-name"];
  const color = tags.color;
  const font = fontParam ? fontParam : "Jersey10";

  const newMessage = `<div style="font-family: ${font}"><b style="color: ${color}">${name}</b>: ${message.toHTML()}</div>`;
  messages = [...messages, newMessage].slice(-10);

  const contents = document.getElementById("contents");
  if (contents) {
    contents.innerHTML = messages.join("");
    contents.scrollTo(0, contents.scrollHeight);
  }
});
