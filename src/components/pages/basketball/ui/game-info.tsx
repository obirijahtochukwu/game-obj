import React, { useState, useEffect } from "react";
import Modal from "../../../ui/modal";
import { Buttons } from "../../../ui/buttons";
import { useFormattedDate } from "../../../../lib/hooks/useFormattedDate";
import { GameData } from "../types";
import { Icons } from "../../../ui/icons";
import Bet from "../../sports/ui/bet";
import { useDiasbleMouse } from "../../../../lib/hooks/useDisableMouse";
import { useGlobalContext } from "../../../../lib/global-context";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";

export default function GameInfo({ game, className, children }: { game: GameData; className: string; children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBetOpen, setIsBetOpen] = useState(false);
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();
  const { user, setRefresh, setIsBetPlaced } = useGlobalContext();
  const { formattedDate } = useFormattedDate();
  const bet = user?.gameHistory.find(({ fixtureId }) => fixtureId == `${game.id}`);

  const placeBet = (betAmount: number, team) => {
    if (betAmount < 1) {
      toast.error("Please enter bet amount");
    } else if (!team.value) {
      toast.error("Please select team/odd");
    } else {
      disableMouse();
      axios
        .post(
          backend_api + "/place-sport-bet",
          {
            userId: user.info._id,
            username: user.info.name,
            game: "Basketball",
            betAmount: betAmount,
            multiplier: Number(team.value.slice(0, -1)),
            fixtureId: game.id,
          },
          { withCredentials: true },
        )
        .then((res) => {
          console.log(res);
          setIsBetOpen(false);
          setIsBetPlaced({
            state: true,
            title: `Your bet on  ${team.name} #${game.league.id} has been placed`,
            data: [
              { name: "Amount", value: `$${betAmount}` },
              { name: "Potential ", value: Number(team.value.slice(0, -1)) * betAmount },
              { name: "Odds", value: team.value },
            ],
          });
          setRefresh(true);
          enableMouse();
        })
        .catch((err) => {
          console.log(err);
          enableMouse();
        });
    }
  };

  useEffect(() => {
    if (bet?.fixtureId && game?.status.long === "Game Finished") {
      const handleBetResult = (odd: any) => {
        // Step 1: Check the bet result
        const checkBetResult = (odd: number) => {
          // Find the outcome corresponding to the selected odd
          const selectedOutcome = game.odds.find((outcome) => outcome.odd === odd.toString())?.value;

          if (!selectedOutcome) {
            return "Invalid odd selected";
          }

          // Determine the actual winner based on scores
          const homeScore = game.scores.home.total;
          const awayScore = game.scores.away.total;

          let actualWinner;
          if (homeScore > awayScore) {
            actualWinner = "Home"; // Home team wins
          } else if (awayScore > homeScore) {
            actualWinner = "Away"; // Away team wins
          } else {
            actualWinner = "Draw"; // It's a tie
          }

          // Compare the selected outcome with the actual winner
          if (selectedOutcome === actualWinner) {
            return "win";
          } else {
            return "loss";
          }
        };

        // Step 2: Determine the result
        const result = checkBetResult(odd);

        // Step 3: Update the bet result in the backend
        axios
          .put(
            backend_api + "/update-bet-on-match-end",
            {
              userId: user.info._id,
              gameId: bet._id,
              result,
              payout: result === "win" ? bet.betAmount * bet.multiplier : 0,
              betAmount: bet.betAmount,
            },
            { withCredentials: true },
          )
          .then((res) => {
            setRefresh(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      // Trigger the bet result handler
      handleBetResult(bet.multiplier.toFixed(2));
    }
  }, [game?.status.long]);

  return (
    <>
      <section onClick={() => setIsOpen(true)} className={className}>
        {children}
      </section>
      <Bet
        bet={{
          title: game.league.name,
          teams: {
            home: { name: game.teams.home.name, odd: game.odds[0]?.odd },
            draw: { name: "draw", odd: game.odds[1]?.odd },
            away: { name: game.teams.away.name, odd: game.odds[2]?.odd },
          },
        }}
        isBetOpen={isBetOpen}
        setIsBetOpen={setIsBetOpen}
        placeBet={placeBet}
        isLoading={isMouseDisable}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} side={true} classname={`!px-3`}>
        <article className="">
          {/* Date */}
          <div className="mx-auto mb-4 w-fit rounded-lg bg-dark px-2 py-1 text-xs font-normal text-primary">
            {game?.date && formattedDate(game?.date)}
          </div>

          {/* Teams and Logos */}
          <header className="flex items-center justify-between rounded-md bg-dark p-2">
            <div className="flex items-center gap-2 text-base font-normal text-primary">
              <img src={game.teams?.home?.logo} alt="" className="h-8 w-8" />
              {game.teams?.home?.name}
            </div>

            <div className="flex items-center gap-2 text-base font-normal text-primary">
              {game.teams?.away?.name}
              <img src={game.teams?.away?.logo} alt="" className="h-8 w-8" />
            </div>
          </header>

          {/* Scores by Quarters */}
          <div className="mt-0.5 flex flex-col gap-3 rounded-md bg-sm p-2 pt-3">
            <div className="mb-0.5 grid grid-cols-8 text-sm font-medium text-primary">
              <div className="text-lefts col-span-3">Team</div>
              <div className="text-center">Q1</div>
              <div className="text-center">Q2</div>
              <div className="text-center">Q3</div>
              <div className="text-center">Q4</div>
              <div className="text-right">Total</div>
            </div>
            <div className="h-px w-full bg-line" />
            <div className="grid grid-cols-8 gap-2 text-sm font-medium text-primary">
              <div className="col-span-3 truncate text-left">{game.teams?.home?.name}</div>
              <div className="text-center">{game.scores?.home?.quarter_1}</div>
              <div className="text-center">{game.scores?.home?.quarter_2}</div>
              <div className="text-center">{game.scores?.home?.quarter_3}</div>
              <div className="text-center">{game.scores?.home?.quarter_4}</div>
              <div className="text-right">{game.scores?.home?.total}</div>
            </div>
            <div className="grid grid-cols-8 gap-2 text-sm font-medium text-primary">
              <div className="col-span-3 truncate text-left">{game.teams?.away?.name}</div>
              <div className="text-center">{game.scores?.away?.quarter_1}</div>
              <div className="text-center">{game.scores?.away?.quarter_2}</div>
              <div className="text-center">{game.scores?.away?.quarter_3}</div>
              <div className="text-center">{game.scores?.away?.quarter_4}</div>
              <div className="text-right">{game.scores?.away?.total}</div>
            </div>
          </div>

          {/* Odds Section */}
          <section className="mt-5 rounded-md bg-advance bg-primary/10 backdrop-blur-md">
            <div className="flex h-10 cursor-pointer items-center justify-between px-4 text-base font-normal text-primary">
              1x2 <Icons.arrow color="#ffffff" className="h-4 w-4 rotate-90" />
            </div>
            <div className="flex flex-col gap-3 border-t border-muted p-2">
              {[
                { name: game.teams?.home?.name, odd: game.odds[0].odd },
                { name: "Draw", odd: game.odds[1].odd },
                { name: game.teams?.away?.name, odd: game.odds[2].odd },
              ].map(({ name, odd }, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-sm bg-dark p-2 text-sm font-medium capitalize tracking-wider text-primary"
                >
                  <div className="">{name}</div>
                  <div className="text-secondary">{odd}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Venue and League Info */}
          <section className="mt-5 rounded-md bg-dark p-4 text-sm font-normal text-primary">
            <div className="flex items-center gap-2">
              <span className="font-medium">Venue:</span>
              <span>{game.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">League:</span>
              <span>
                {game.league?.name} ({game.league?.season})
              </span>
            </div>
          </section>

          {/* Place Bet Button */}
          <Buttons.primary
            disabled={bet?.fixtureId ? true : false}
            onClick={() => {
              +setIsBetOpen(true);
              setIsOpen(false);
            }}
            classname="mt-4"
          >
            {bet?.fixtureId ? "You have placed bet" : "Place bet"}
          </Buttons.primary>
        </article>
      </Modal>
    </>
  );
}
