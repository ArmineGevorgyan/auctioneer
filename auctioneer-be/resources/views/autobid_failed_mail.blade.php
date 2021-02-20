<!DOCTYPE html>
<html>

<head>
    <title>Autobidding unsuccessful on {{$item_name}}</title>
    <meta charset="utf-8"/>
</head>

<body>
    <div>
        <p> Your bid on the item {{$item_name}} has just been outbid. The new highest bid is {{$bid_amount}}. Your remaining maximum autobidding amount is not sufficient to outbid the current bidder. </p>
        <p><strong>Autobidding has now been disabled for this item. </strong> If you still want to continue bidding on this item you can follow the following link to make a new bid or enable autobidding: {{$item_url}}. You can also follow the following link to update your maximum autobiding amount: {{$profile_url}}</p>
    </div>
</body>

</html>