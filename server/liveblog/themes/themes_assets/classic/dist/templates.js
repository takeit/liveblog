angular.module("theme").run(["$templateCache", function($templateCache) {$templateCache.put("views/author.html","<div class=\"lb-author\" ng-if=\"timeline.settings.showAuthor\"><div ng-if=\"timeline.settings.showAuthor && timeline.settings.showAuthorAvatar\" ng-class=\"{\'lb-author__avatar\': (item.item_type !== \'comment\'),\n                       \'lb-author__comment\': (item.item_type === \'comment\')}\"><img ng-src=\"{{ item.original_creator.picture_url }}\" ng-srcset=\"{{ item.original_creator.picture_srcset }}\" sizes=\"(min-width: 1600px) 200px, 60px\"></div><div class=\"lb-author__date\" ng-bind=\"item.displayDate | prettifyIsoDate\"></div><div ng-if=\"!timeline.settings.authorNameLinksToEmail || item.item_type === \'comment\'\" class=\"lb-author__name\" ng-bind=\"item.original_creator[item.item_type === \'comment\'? \'display_name\': timeline.settings.authorNameFormat]\"></div><div ng-if=\"timeline.settings.authorNameLinksToEmail && item.item_type !== \'comment\'\" class=\"lb-author__name\"><a href=\"mailto:{{post.mainItem.original_creator.email}}\" ng-bind=\"item.original_creator[timeline.settings.authorNameFormat]\"></a></div></div>");
$templateCache.put("views/comments.html","<div class=\"modal border-bottom ng-cloak\" ng-show=\"modal\"><div class=\"modal-dialog\"><div ng-show=\"notify\" class=\"notify\"><div class=\"content\"><div class=\"modal-header\"><h3 translate>Your comment was sent for approval.</h3></div></div></div><div ng-show=\"form\"><form name=\"comment\" novalidate ng-submit=\"send();\"><div class=\"content\"><div class=\"modal-header\"><h2 translate>Post a comment</h2></div><div class=\"modal-body\"><fieldset><div class=\"field\"><label for=\"commenter\" translate>Name *</label><input name=\"commenter\" ng-model=\"commenter\"><div role=\"alert\"><span class=\"error\" ng-show=\"commenter.length < 3\" translate>Please fill in your Name.</span> <span class=\"error\" ng-show=\"commenter.length >30\" translate>Name should be maximum 30 characters in length.</span></div></div><div class=\"field\"><label for=\"content\" translate>Comment *</label><textarea name=\"content\" ng-model=\"content\"></textarea><div role=\"alert\"><span class=\"error\" ng-show=\"content.length < 3\" translate>Please fill in your Comment.</span> <span class=\"error\" ng-show=\"content.length > 300\" translate>Comment should be maximum 300 characters in length.</span></div></div></fieldset></div><div class=\"modal-footer\"><button class=\"btn\" ng-click=\"comment=false\"><span translate>Cancel</span></button> <button type=\"submit\" class=\"btn btn-primary\"><span translate>Send</span></button></div></div></form></div></div></div>");
$templateCache.put("views/dropdown.html","<div class=\"dropdown-container\" ng-class=\"{ \'show\': listVisible }\"><div class=\"dropdown-display\" ng-click=\"show();\" ng-class=\"{ \'clicked\': listVisible }\"><span ng-if=\"!isPlaceholder\">{{display | translate}}</span> <span class=\"placeholder\" ng-if=\"isPlaceholder\">{{placeholder}}</span> <i class=\"icon-chevron-down\"></i></div><div class=\"dropdown-list\"><div><div ng-repeat=\"item in list\" ng-click=\"select(item)\" ng-class=\"{ \'selected\': isSelected(item) }\"><span>{{item.name | translate}}</span> <i class=\"icon-checkmark icon--white\"></i></div></div></div></div>");
$templateCache.put("views/gallery.html","<div class=\"lb-gallery\"><div class=\"justified-gallery gallery\"><a class=\"picture\" href=\"#\" ng-repeat=\"item in gallery.images track by item._id\"><img ng-src=\"{{ item.picture_url }}\" ng-srcset=\"{{ item.picture_srcset }}\" alt=\"{{ item.meta.full_caption }}\" data-original-src=\"{{ item.meta.media.renditions.baseImage.href }}\" data-original-src-height=\"{{ item.meta.media.renditions.baseImage.height }}\" data-original-src-width=\"{{ item.meta.media.renditions.baseImage.width }}\"></a></div></div>");
$templateCache.put("views/generic-embed.html","<div ng-if=\"item.meta.html\" class=\"item--embed\" lb-bind-html html-content=\"{{item.meta.html | fixEmbed}}\"></div><article class=\"item--embed\"><a ng-href=\"{{ item.meta.url }}\" ng-if=\"!item.meta.html && item.meta.thumbnail_url\" target=\"_blank\" ng-class=\"{ \'item--embed__illustration\': item.meta.description, \'item--embed__only-illustration\': !item.meta.description}\"><img ng-src=\"{{ item.meta.thumbnail_url }}\"></a><div class=\"item--embed__title\" ng-if=\"item.meta.title\"><a ng-href=\"{{ item.meta.url }}\" target=\"_blank\" ng-bind=\"item.meta.title\"></a></div><div class=\"item--embed__description\" ng-if=\"item.meta.description\" ng-bind=\"item.meta.description\"></div><div class=\"item--embed__credit\" ng-if=\"item.meta.credit\" ng-bind=\"item.meta.credit\"></div></article>");
$templateCache.put("views/item.html","<div ng-switch=\"item.group_type\" ng-class=\"[\'lb-item-{{ item.item_type | varname }}\']\"><div ng-switch-when=\"freetype\"><article lb-bind-html html-content=\"{{ item.text }}\"></article></div><div ng-switch-default><div ng-switch=\"item.item_type\" ng-class=\"{\'lb-item\': ident}\"><div ng-switch-when=\"embed\"><div ng-switch=\"item.meta.provider_name\"><div ng-switch-when=\"Twitter\"><lb-twitter-card lb-twitter-content=\"{{ item.meta.html }}\"></lb-twitter-card></div><div ng-switch-default lb-generic-embed lb-fluid-iframe item=\"item\"></div></div></div><div ng-switch-when=\"image\" ng-if=\"!gallery\"><figure><img ng-src=\"{{ item.picture_url }}\" ng-srcset=\"{{ item.picture_srcset }}\" alt=\"{{ item.meta.caption }}\" sizes=\"80vw\"><figcaption translate>{{ item.meta.caption }} credit: {{ item.meta.credit }}</figcaption></figure></div><div ng-switch-when=\"quote\"><blockquote><p>{{ item.meta.quote }}</p><h4>{{ item.meta.credit }}</h4></blockquote></div><article ng-switch-default lb-bind-html html-content=\"{{ item.text | outboundAnchors | fixMarkup }}\"></article></div></div></div>");
$templateCache.put("views/posts.html","<article ng-repeat=\"post in ctrl.allPosts() track by post._id\" class=\"lb-post list-group-item ng-cloak\" ng-class=\"[\'lb-mainitem-{{ post.mainItem.item_type | varname }}\', {\'show-author-avatar\': \n                        ctrl.timeline.settings.showAuthor &&\n                        ctrl.timeline.settings.showAuthorAvatar &&\n                        !ctrl.isAd(post) &&\n                        !ctrl.hideInfo,\n                    \'lb-post-permalink-selected\': post._id === timeline.permalink._id}]\"><span ng-if=\"!ctrl.isAd(post) && !ctrl.hideInfo\"><lb-author item=\"post.mainItem\" timeline=\"timeline\"></lb-author><div class=\"lb-post-highlighted\" ng-if=\"post.lb_highlight\"><i class=\"icon-star icon--orange\"></i></div><div class=\"lb-post-permalink\" style=\"right:30px\" ng-click=\"showSocialBox = !showSocialBox\" ng-if=\"ctrl.timeline.settings.showSocialShare\"><i class=\"fa fa-share share-icon\" title=\"{{ \'Social Share\' | translate }}\"></i><div ng-if=\"showSocialBox\" class=\"share-box\"><a href=\"//www.facebook.com/sharer.php?s=100&p[title]=&p[url]={{ ctrl.timeline.permalink.get(post._id) }}\" class=\"social facebook\" target=\"_blank\" title=\"{{ \'Share this post on Facebook\' | translate }}\" onclick=\"openSocialShareWindow(this.href, 570, 400)\"><span class=\"fa fa-facebook social-icon\"></span> </a><a href=\"//twitter.com/home?status={{ ctrl.timeline.permalink.get(post._id) }}\'\" class=\"social twitter\" target=\"_blank\" title=\"{{ \'Share this post on Twitter\' | translate }}\" onclick=\"openSocialShareWindow(this.href, 570, 400)\"><span class=\"fa fa-twitter social-icon\"></span> </a><a href=\"//www.linkedin.com/shareArticle?mini=true&url={{ ctrl.timeline.permalink.get(post._id) }}\" class=\"social linkedin\" target=\"_blank\" title=\"{{ \'Share this post on Linkedin\' | translate }}\" onclick=\"openSocialShareWindow(this.href, 570, 400)\"><span class=\"fa fa-linkedin social-icon\"></span> </a><a href=\"//plus.google.com/share?url={{ ctrl.timeline.permalink.get(post._id) }}\" class=\"social google\" target=\"_blank\" title=\"{{ \'Share this post on Google+\' | translate }}\" onclick=\"openSocialShareWindow(this.href, 570, 400)\"><span class=\"fa fa-google-plus social-icon\"></span> </a><a href=\"mailto:?to=&subject=Liveblog&body={{ ctrl.timeline.permalink.get(post._id) }}\" class=\"social email\" target=\"_blank\" title=\"{{ \'Share this post on Email\' | translate }}\" onclick=\"openSocialShareWindow(this.href, 1024, 768)\"><span class=\"fa fa-envelope social-icon\"></span></a></div></div><div class=\"lb-post-permalink\"><a href=\"{{ ctrl.timeline.permalink.get(post._id) }}\" id=\"{{ post._id }}\" target=\"_blank\"><i class=\"icon-link icon--blue\"></i></a></div></span><lb-gallery items=\"post.items\" ng-if=\"ctrl.showGallery(post)\"></lb-gallery><span ng-if=\"ctrl.isAd(post)\"><div class=\"lb-advertisement\" translate>Advertisement</div></span><span></span><div ng-repeat=\"item in post.items track by item._id\" class=\"lb-item\"><div ng-if=\"post.fullDetails && !$first\" class=\"list-group-item\"><div class=\"lb-timeline__header\"><lb-author item=\"item\" timeline=\"ctrl.timeline\"></lb-author><lb-item ident=\"true\" item=\"item\" gallery=\"ctrl.showGallery(post)\"></lb-item></div></div><div ng-if=\"!post.fullDetails || $first\"><lb-item item=\"item\" gallery=\"ctrl.showGallery(post)\"></lb-item></div></div><div class=\"lb-updated-date ng-cloak\" ng-if=\"!ctrl.isAd(post) || ctrl.hideInfo\" ng-show=\"post.showUpdate\" translate>Updated {{post.content_updated_date | prettifyIsoDate}}</div></article>");}]);