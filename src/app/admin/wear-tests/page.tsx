import { listWearTestEntries } from "@/lib/wearTests";
import { createWearTestEntryAction } from "../actions";

export const dynamic = "force-dynamic";

export default function AdminWearTestsPage() {
  const entries = listWearTestEntries();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Family Wear-Testing Tracker</h2>

      <form action={createWearTestEntryAction} className="grid sm:grid-cols-2 gap-4 mb-10 border border-border rounded-lg p-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Tester name *</label>
          <input name="testerName" required className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Item type *</label>
          <input name="itemType" required className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Fabric blend</label>
          <input name="fabricBlend" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Wash count</label>
          <input type="number" name="washCount" defaultValue={0} className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Checkpoint</label>
          <select name="checkpoint" className="w-full border border-border rounded px-3 py-2 bg-background">
            <option>First Wear</option>
            <option>Mid-Cycle</option>
            <option>Final</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Date tested</label>
          <input type="date" name="dateTested" className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Comfort rating (1-10)</label>
          <input type="number" min={1} max={10} name="comfortRating" defaultValue={8} className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Pass / Fail</label>
          <select name="passFail" className="w-full border border-border rounded px-3 py-2 bg-background">
            <option>Pass</option>
            <option>Fail</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">Performance notes</label>
          <textarea name="performanceNotes" rows={2} className="w-full border border-border rounded px-3 py-2 bg-background" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="bg-accent text-black font-semibold px-6 py-2.5 rounded-full hover:opacity-90">
            Log entry
          </button>
        </div>
      </form>

      {entries.length === 0 ? (
        <p className="text-foreground/60">No wear-test entries logged yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-foreground/60">
              <th className="py-1.5 pr-2">Tester</th>
              <th className="py-1.5 pr-2">Item</th>
              <th className="py-1.5 pr-2">Checkpoint</th>
              <th className="py-1.5 pr-2">Washes</th>
              <th className="py-1.5 pr-2">Comfort</th>
              <th className="py-1.5 pr-2">Notes</th>
              <th className="py-1.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="py-1.5 pr-2">{e.testerName}</td>
                <td className="py-1.5 pr-2">{e.itemType}</td>
                <td className="py-1.5 pr-2">{e.checkpoint}</td>
                <td className="py-1.5 pr-2">{e.washCount}</td>
                <td className="py-1.5 pr-2">{e.comfortRating}/10</td>
                <td className="py-1.5 pr-2 max-w-xs">{e.performanceNotes}</td>
                <td className={`py-1.5 font-semibold ${e.passFail === "Pass" ? "text-green-400" : "text-red-400"}`}>
                  {e.passFail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
