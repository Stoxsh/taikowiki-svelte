import { error, type Handle } from "@sveltejs/kit";
import { runQuery } from "@sveltekit-board/db";

export default class BanController{
    static async checkIpHandle({event, resolve}:Parameters<Handle>[0]): Promise<Response> {
        const banned = await runQuery(async(run) => {
            return (await run("SELECT COUNT(*) FROM `ban/ip` WHERE `ip` = ?", [event.getClientAddress()])).length === 0;
        })

        if(banned){
            throw error(403, 'Your IP Address has been BANNED.')
        }

        return await resolve(event);
    }
}