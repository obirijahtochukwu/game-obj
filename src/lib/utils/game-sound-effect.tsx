import React from "react";
import { SMSoundService } from "../hooks/useSoundProvider";

export default function gameSoundEffect(state: string) {
  if (state == "start") {
    SMSoundService.coin();
  } else if (state == "active") {
    SMSoundService.blip();
  } else if (state == "win") {
    SMSoundService.win();
  } else if (state == "loss") {
    SMSoundService.unlucky();
  }
}
