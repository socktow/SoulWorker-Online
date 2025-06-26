import ping from 'ping';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get('host');

  if (!host) {
    return Response.json({ error: 'Missing host' }, { status: 400 });
  }

  try {
    const res = await ping.promise.probe(host);
    return Response.json({
      host: res.host,
      alive: res.alive,
      time: res.time, // ping time in ms
    });
  } catch (err) {
    return Response.json({ error: 'Ping failed' }, { status: 500 });
  }
}
