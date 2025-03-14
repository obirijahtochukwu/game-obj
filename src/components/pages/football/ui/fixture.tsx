import React, { useEffect, useState } from "react";
import { footballMergedData } from "../../../../lib/types";
import { backend_api, toPercentage } from "../../../../lib/constants";
import Tag from "./tag";
import TeamDetails from "../../sports/ui/team-details";
import axios from "axios";
import { useGlobalContext } from "../../../../lib/global-context";
import { useDiasbleMouse } from "../../../../lib/hooks/useDisableMouse";
import { toast } from "react-toastify";

export default function Fixture({ prop }: { prop: footballMergedData }) {
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();
  const { user, setRefresh, setIsBetPlaced } = useGlobalContext();
  const [team, setTeam] = useState(() => ({
    state: false,
    data: {},
  }));

  const bet = user?.gameHistory.find(({ fixtureId }) => fixtureId == prop.fixture.id);

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
            game: "Football",
            betAmount: betAmount,
            multiplier: Number(team.value.slice(0, -1)),
            fixtureId: prop.fixture.id,
          },
          { withCredentials: true },
        )
        .then((res) => {
          console.log(res);
          setIsBetPlaced({
            state: true,
            title: `Your bet on  ${prop.league.name} #${prop.league.id} has been placed`,
            data: [
              { name: "Amount", value: betAmount },
              { name: "Potential ", value: Number(team.value.slice(0, -1)) * betAmount },
              { name: "Odds", value: team.value },
            ],
          });
          setRefresh(true);
          enableMouse();
          setTeam({ state: false, data: {} });
        })
        .catch((err) => {
          console.log(err);
          enableMouse();
        });
    }
  };

  useEffect(() => {
    if (bet?.fixtureId && prop?.fixture.status.short == "FT") {
      const handleBetResult = (odd: any) => {
        // Step 1: Check the bet result
        const checkBetResult = (odd: number) => {
          // Find the outcome corresponding to the selected odd
          const selectedOutcome = prop.odd.values.find((outcome) => outcome.odd === odd.toString())?.value;

          if (!selectedOutcome) {
            return "Invalid odd selected";
          }

          // Determine the actual winner
          const actualWinner = prop.teams.home.winner ? "Home" : prop.teams.away.winner ? "Away" : "Draw";

          // Compare the selected outcome with the actual winner
          if (selectedOutcome === actualWinner) {
            return "win";
          } else {
            return "loss";
          }
        };

        // Step 2: Determine the result
        const result = checkBetResult(odd);

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
            console.log(res);
            setRefresh(true); // Refresh the UI or state if needed
            console.log(user.gameHistory);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      handleBetResult(bet.multiplier.toFixed(2));
    }
  }, [prop?.fixture.status.short]);

  useEffect(() => {
    if (team.state) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [team.state]);

  const props = {
    team: team.data,
    isOpen: team.state,
    setIsOpen: (e: boolean) => setTeam({ state: e, data: {} }),
    placeBet,
    isLoading: isMouseDisable,
    disabled: bet?.fixtureId,
  };

  return (
    <>
      {team.state ? <TeamDetails {...props} /> : false}
      <div
        onClick={() => setTeam({ state: true, data: prop })}
        className="flex min-h-64 cursor-pointer flex-col gap-4 rounded-2xl border-2 border-transparent bg-muted p-4 text-primary duration-200 hover:shadow-md"
      >
        <div className="flex items-center justify-between text-xl font-semibold tracking-tight text-grey">
          {prop.league.name}
          {bet?.payout > -1 && (
            <div
              className={`mb-2 w-max rounded-sm border px-2 font-advance text-xs italic tracking-wider ${bet.result == "win" ? "border-success text-success" : "border-grey text-error"}`}
            >
              {bet.result == "win" ? (
                <>
                  <span className="text-primary">You won:</span> ${bet?.payout}
                </>
              ) : (
                <>
                  <span className="text-primary">You lost:</span> ${bet?.betAmount}
                </>
              )}
            </div>
          )}
        </div>
        <section className="flex items-center justify-between font-advance">
          <div className="">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={prop.teams.home.logo} alt="" className="h-8 w-8" />

              {prop.teams.home.name}
            </div>
            <div className="mt-6 flex items-center gap-2 text-lg font-medium">
              <img src={prop.teams.away.logo} alt="" className="h-8 w-8" />
              {prop.teams.away.name}
            </div>
          </div>
          <div className="text-lg font-medium">VS</div>
          <div className="flex flex-col gap-4">
            <Tag>{prop.odd?.values[0].odd}</Tag>
            <Tag>{prop.odd?.values[2].odd}</Tag>
          </div>
        </section>
        <section className="mt-auto flex flex-wrap gap-2">
          <Tag>
            <>
              {prop.teams.home.name}
              <div className="">{toPercentage(+prop.odd?.values[0].odd)}</div>
            </>
          </Tag>
          <Tag>
            <>
              Draw
              <div className="">{toPercentage(+prop.odd?.values[1].odd)}</div>
            </>
          </Tag>
          <Tag>
            <>
              {prop.teams.away.name}
              <div className="">{toPercentage(+prop.odd?.values[2].odd)}</div>
            </>
          </Tag>
        </section>
      </div>
    </>
  );
}
