const get_table_rows_url = 'https://wax.greymass.com/v1/chain/get_table_rows';

const table_query = {
  "json": true,
  "code": "atomicdropsx",
  "scope": "atomicdropsx",
  "table": "drops",
  "table_key": "",
  "lower_bound": "0",
  "upper_bound": null,
  "index_position": 1,
  "key_type": "",
  "limit": "10000",
  "reverse": true,
  "show_payer": false
};

fetch(get_table_rows_url, {
  method: 'POST',
  body: JSON.stringify(table_query)
}).
  then(response => response.json()).
  then(result => {
    const free_current = result.rows.filter(d => {
      return d.listing_price == "0 NULL" &&
      parseInt(d.current_claimed) < parseInt(d.max_claimable) &&
      (
        d.end_time == 0 || d.end_time > Math.floor((new Date).getTime()/1000)
      )
    });

    const free_current_ids = free_current.map(d => d.drop_id);
    const redirect_url = "https://wax.atomichub.io/drops/" + free_current_ids.join('+');
    window.location = redirect_url;
  });
