import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Link, Outlet, Route, Routes, StaticRouter, matchPath, useMatch, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/Icons/BarsIcon.jsx
function BarsIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 1.5,
		stroke: "currentColor",
		className: `size-6 ${className}`,
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M3.75 6.75H14.5M3.75 12H20.25M11.5 17.25H20.25M17.5 6.75H20.25M8.5 17.25H3.75"
		})
	});
}
//#endregion
//#region src/components/collectionList/LoadingBars.jsx
function LoadingBars({ width = 20 }) {
	return /* @__PURE__ */ jsx("div", {
		className: " absolute inset-0 flex items-center justify-center animate-pulse",
		children: /* @__PURE__ */ jsx("div", {
			style: { width: `${width * .25}rem` },
			children: /* @__PURE__ */ jsx(BarsIcon, { className: `w-full h-auto text-stone-300` })
		})
	});
}
//#endregion
//#region src/Icons/mailIcon.jsx
function MailIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 1.5,
		stroke: "currentColor",
		className: `size-6 ${className}`,
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
		})
	});
}
//#endregion
//#region src/Icons/shoppingBagIcon.jsx
function ShoppingBagIcon({ className }) {
	return /* @__PURE__ */ jsxs("svg", {
		width: "20",
		height: "25",
		viewBox: "0 0 20 25",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M19.5 7.33026V19.5422C19.5 22.0275 17.4853 24.0422 15 24.0422H5C2.51472 24.0422 0.5 22.0275 0.5 19.5422V7.33026H19.5Z",
				stroke: "currentColor"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M4.35425 10.9631C4.35425 10.9631 4.63519 0.883813 10.1774 1.00101C15.7196 1.11822 15.7196 10.9631 15.7196 10.9631",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("rect", {
				x: "4",
				y: "19",
				width: "5",
				height: "2",
				fill: "currentColor"
			})
		]
	});
}
//#endregion
//#region src/Icons/InstaIcon.jsx
function InstaIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		children: /* @__PURE__ */ jsx("path", {
			d: "M10.0009 0C7.28508 0 6.94424 0.0118752 5.87756 0.0604169C4.81297 0.109167 4.08629 0.277708 3.45045 0.525C2.79274 0.780417 2.23481 1.12208 1.67898 1.67813C1.12272 2.23396 0.78105 2.79187 0.524797 3.44937C0.276878 4.08542 0.108126 4.81229 0.0602089 5.87646C0.0125 6.94312 0 7.28417 0 10C0 12.7158 0.0120837 13.0556 0.0604175 14.1223C0.109376 15.1869 0.27792 15.9135 0.525006 16.5494C0.780633 17.2071 1.1223 17.765 1.67835 18.3208C2.23398 18.8771 2.7919 19.2196 3.4492 19.475C4.08546 19.7223 4.81234 19.8908 5.87673 19.9396C6.94341 19.9881 7.28403 20 9.99969 20C12.7158 20 13.0556 19.9881 14.1222 19.9396C15.1868 19.8908 15.9143 19.7223 16.5506 19.475C17.2081 19.2196 17.7652 18.8771 18.3208 18.3208C18.8771 17.765 19.2187 17.2071 19.475 16.5496C19.7208 15.9135 19.8896 15.1867 19.9396 14.1225C19.9875 13.0558 20 12.7158 20 10C20 7.28417 19.9875 6.94333 19.9396 5.87667C19.8896 4.81208 19.7208 4.08542 19.475 3.44958C19.2187 2.79187 18.8771 2.23396 18.3208 1.67813C17.7646 1.12188 17.2083 0.780208 16.55 0.525C15.9125 0.277708 15.1854 0.109167 14.1208 0.0604169C13.0541 0.0118752 12.7145 0 9.99781 0H10.0009ZM9.10385 1.80208C9.3701 1.80167 9.66718 1.80208 10.0009 1.80208C12.671 1.80208 12.9874 1.81167 14.0418 1.85958C15.0168 1.90417 15.546 2.06708 15.8985 2.20396C16.3652 2.38521 16.6979 2.60187 17.0477 2.95187C17.3977 3.30187 17.6143 3.63521 17.796 4.10187C17.9329 4.45396 18.096 4.98312 18.1404 5.95812C18.1883 7.01229 18.1987 7.32896 18.1987 9.99771C18.1987 12.6665 18.1883 12.9831 18.1404 14.0373C18.0958 15.0123 17.9329 15.5415 17.796 15.8935C17.6148 16.3602 17.3977 16.6925 17.0477 17.0423C16.6977 17.3923 16.3654 17.609 15.8985 17.7902C15.5464 17.9277 15.0168 18.0902 14.0418 18.1348C12.9876 18.1827 12.671 18.1931 10.0009 18.1931C7.3307 18.1931 7.01424 18.1827 5.96006 18.1348C4.98505 18.0898 4.45588 17.9269 4.10317 17.79C3.6365 17.6087 3.30316 17.3921 2.95316 17.0421C2.60315 16.6921 2.38648 16.3596 2.20481 15.8927C2.06794 15.5406 1.90481 15.0115 1.86044 14.0365C1.81252 12.9823 1.80294 12.6656 1.80294 9.99521C1.80294 7.32479 1.81252 7.00979 1.86044 5.95563C1.90502 4.98063 2.06794 4.45146 2.20481 4.09896C2.38607 3.63229 2.60315 3.29896 2.95316 2.94896C3.30316 2.59896 3.6365 2.38229 4.10317 2.20062C4.45567 2.06312 4.98505 1.90063 5.96006 1.85583C6.88257 1.81417 7.24008 1.80167 9.10385 1.79958V1.80208ZM15.3389 3.4625C14.6764 3.4625 14.1389 3.99937 14.1389 4.66208C14.1389 5.32458 14.6764 5.86208 15.3389 5.86208C16.0014 5.86208 16.5389 5.32458 16.5389 4.66208C16.5389 3.99958 16.0014 3.46208 15.3389 3.46208V3.4625ZM10.0009 4.86458C7.16487 4.86458 4.86547 7.16396 4.86547 10C4.86547 12.836 7.16487 15.1344 10.0009 15.1344C12.837 15.1344 15.1356 12.836 15.1356 10C15.1356 7.16396 12.837 4.86458 10.0009 4.86458ZM10.0009 6.66667C11.8418 6.66667 13.3343 8.15896 13.3343 10C13.3343 11.8408 11.8418 13.3333 10.0009 13.3333C8.15988 13.3333 6.66757 11.8408 6.66757 10C6.66757 8.15896 8.15988 6.66667 10.0009 6.66667Z",
			fill: "currentColor"
		})
	});
}
//#endregion
//#region src/components/Header.jsx
function Header({ isLoading, appContext, setCartOpen }) {
	const { collectionSlug } = useParams();
	const isHome = useMatch({
		path: "/",
		end: true
	});
	const isProduct = useMatch("/product/:id");
	const isCollection = useMatch("/collection/:id");
	const isSuccess = useMatch("/success");
	const basicHeader = isProduct || isSuccess;
	const collectionName = isCollection ? appContext.collections.find((item) => item.slug === collectionSlug)?.name : "";
	const collectionImage = isCollection ? appContext.collections.find((item) => item.slug === collectionSlug)?.imageUrl : "";
	const iconHoverClass = basicHeader ? "hover:text-gray-500" : "hover:text-gray-100";
	const resolvedHeroUrl = isHome ? appContext.initialHeroImages.length ? appContext.initialHeroImages[0].url : "" : collectionImage;
	const [heroUrl, setHeroUrl] = useState(resolvedHeroUrl);
	useEffect(() => {
		setHeroUrl(resolvedHeroUrl);
	}, [resolvedHeroUrl]);
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", {
		className: `relative mt-8 bg-cover bg-center 
          ${isLoading ? "text-gray-700" : basicHeader ? "text-gray-700" : "text-white"} 
          ${basicHeader ? "h-28 bg-stone-100" : "h-96 bg-stone-50"}  
          flex justify-between mb-6 rounded`,
		style: { backgroundImage: `url(${basicHeader ? "" : heroUrl})` },
		children: [
			isLoading ? !basicHeader && /* @__PURE__ */ jsx(LoadingBars, {}) : !basicHeader && /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-gradient-to-b from-black/30 to-transparent",
				children: /* @__PURE__ */ jsx("p", {
					className: " flex h-96 justify-center items-center text-3xl uppercase font-light text-white",
					children: collectionName
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: ` p-8 z-10`,
				children: /* @__PURE__ */ jsxs(Link, {
					className: "flex items-end bg-black/0  rounded",
					to: "/",
					children: [/* @__PURE__ */ jsx("svg", {
						width: "50",
						viewBox: "0 0 113 123",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: /* @__PURE__ */ jsx("path", {
							d: "M2 2V56.5848H50.2977M61.313 2H113M61.313 29.8551H113M61.313 56.5848H113M2 122.987V90.2364C2 60.6646 57.3588 61.6494 57.3588 90.2364V122.987M107.916 68.3891V123",
							stroke: "currentColor",
							strokeWidth: "4"
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "font-raleway font-light uppercase text-xl ml-4 -mb-1.5 ",
						children: "Visual art"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `flex pt-4 pr-6 z-10 `,
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mt-1 mr-2.5",
						children: /* @__PURE__ */ jsx(InstaIcon, { className: `${iconHoverClass} hover:scale-110 cursor-pointer` })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-1 mr-2.5",
						children: /* @__PURE__ */ jsx(MailIcon, { className: `${iconHoverClass} hover:scale-110 cursor-pointer` })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "cursor-pointer",
						onClick: () => setCartOpen(true),
						children: /* @__PURE__ */ jsx(ShoppingBagIcon, { className: `${iconHoverClass} hover:scale-110` })
					})
				]
			})
		]
	}) });
}
//#endregion
//#region src/components/Footer.jsx
function Footer() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-end flex-col mt-8 bg-stone-100 h-40 mb-10 p-6 text-sm text-stone-800 rounded",
		children: [
			/* @__PURE__ */ jsx("p", { children: "Leni the creative force behind Leni Visual Art, creates refined, coastal-inspired works shaped by Australia’s raw natural elements." }),
			/* @__PURE__ */ jsx("p", { children: "Working across ceramics and painting, her pieces echo the textures of driftwood, stone, and sea—bringing a quiet, elemental elegance to contemporary interiors." }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex p-4 gap-4 underline",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "",
						children: "Instagram"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "",
						children: "Contact"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "",
						children: "Gallery"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/utils/formatCurrency.js
function formatCurrency(cents, locale = "en-AU", currency = "AUD") {
	if (cents == null) return "";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency
	}).format(cents / 100);
}
//#endregion
//#region src/components/cartDrawer/CartDrawer.jsx
function CartDrawer({ isOpen, setIsOpen, cart, removeFromCart, refreshProducts }) {
	const [isLoading, setIsLoading] = useState(false);
	const [cartMessage, setCartMessage] = useState("");
	const total = cart.reduce((sum, item) => sum + item.item_data.variations[0].item_variation_data.price_money.amount, 0);
	const closeDrawer = () => {
		setCartMessage("");
		setIsOpen(false);
	};
	const handleBuyNow = async () => {
		if (!!cart.length) {
			setIsLoading(true);
			const res = await fetch("/api/create-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(cart)
			});
			const data = await res.json();
			if (!res.ok) {
				setCartMessage(data.msg || "Checkout is currently unavailable.");
				setIsLoading(false);
			} else if (data.msg) {
				const itemIdsToRemove = data.itemsOutOfStock.map((el) => el.itemId);
				refreshProducts();
				setCartMessage(data.msg);
				removeFromCart(itemIdsToRemove);
				setIsLoading(false);
			} else {
				window.location.href = data.checkoutUrl;
				setIsLoading(false);
			}
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: ``,
		children: [/* @__PURE__ */ jsx("div", {
			onClick: closeDrawer,
			className: `fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`
		}), /* @__PURE__ */ jsxs("div", {
			className: `fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between p-4 border-b",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex  items-center gap-3",
						children: [
							/* @__PURE__ */ jsx(ShoppingBagIcon, {}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-semibold",
								children: "Shopping Cart"
							}),
							!!cart.length && /* @__PURE__ */ jsx("div", {
								className: "flex justify-center items-center bg-amber-200 rounded-full h-6 w-6 text-sm",
								children: cart.length
							})
						]
					}), /* @__PURE__ */ jsx("button", {
						className: "hover:bg-black/10 rounded-full p-1",
						onClick: closeDrawer,
						children: /* @__PURE__ */ jsx("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							fill: "none",
							viewBox: "0 0 24 24",
							strokeWidth: 1.5,
							stroke: "currentColor",
							className: "size-6",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M6 18 18 6M6 6l12 12"
							})
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex-1 p-4 space-y-4 overflow-y-auto",
					children: cart.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-center text-gray-500",
						children: "Cart is empty"
					}) : cart.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center border-b pb-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-medium",
							children: item.item_data.name
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500",
							children: Object.values(item.custom_attribute_values).find((el) => el.name === "headline").string_value
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-1 items-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-base font-bold text-gray-700",
								children: formatCurrency(item.item_data.variations[0].item_variation_data.price_money.amount)
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => removeFromCart(item.id),
								className: "text-stone-500 text-sm hover:scale-125 transition-transform",
								children: /* @__PURE__ */ jsx("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									viewBox: "0 0 16 16",
									fill: "currentColor",
									className: "size-4",
									children: /* @__PURE__ */ jsx("path", {
										fillRule: "evenodd",
										d: "M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z",
										clipRule: "evenodd"
									})
								})
							})]
						})]
					}, item.id))
				}),
				cartMessage && /* @__PURE__ */ jsxs("div", {
					className: "p-4 flex items-center gap-2 ",
					children: [/* @__PURE__ */ jsx("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						fill: "none",
						viewBox: "0 0 24 24",
						strokeWidth: 1.5,
						stroke: "currentColor",
						className: "size-6 text-amber-500",
						children: /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
						})
					}), cartMessage]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "p-4 border-t",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between font-semibold mb-3",
						children: [/* @__PURE__ */ jsx("span", { children: "Total" }), /* @__PURE__ */ jsx("span", { children: formatCurrency(total) })]
					}), /* @__PURE__ */ jsx("button", {
						className: "flex justify-center items-center w-full h-10 bg-black hover:opacity-90 text-white cursor-pointer rounded-md",
						onClick: handleBuyNow,
						children: isLoading ? /* @__PURE__ */ jsxs("svg", {
							className: "animate-spin h-5 w-5 text-white",
							xmlns: "http://www.w3.org/2000/svg",
							fill: "none",
							viewBox: "0 0 24 24",
							children: [/* @__PURE__ */ jsx("circle", {
								className: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								strokeWidth: "4"
							}), /* @__PURE__ */ jsx("path", {
								className: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							})]
						}) : /* @__PURE__ */ jsx("span", { children: "Checkout" })
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/utils/localStorageCartHelper.js
var TTL = 1e3 * 60 * 60 * 24;
function saveCart(key, items) {
	const now = Date.now();
	const payload = {
		items,
		updatedAt: now,
		expiresAt: now + TTL
	};
	localStorage.setItem(key, JSON.stringify(payload));
}
function loadCart(key) {
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return [];
		const cart = JSON.parse(raw);
		if (Date.now() > cart.expiresAt) {
			localStorage.removeItem(key);
			return [];
		}
		return cart.items || [];
	} catch {
		localStorage.removeItem(key);
		return [];
	}
}
//#endregion
//#region src/App.jsx
var CART_KEY = "cart";
function App({ initialData }) {
	const [appContext, setAppContext] = useState(initialData);
	const setCartOpen = (state) => setAppContext((oldCtx) => ({
		...oldCtx,
		isCartOpen: state
	}));
	const refreshProducts = () => setAppContext((oldCtx) => ({
		...oldCtx,
		productFetchIteration: appContext.productFetchIteration + 1
	}));
	const setCart = (cart) => setAppContext((oldCtx) => ({
		...oldCtx,
		cart
	}));
	const removeFromCart = (itemIds) => {
		const idsToRemove = new Set(Array.isArray(itemIds) ? itemIds : [itemIds]);
		setAppContext((oldCtx) => ({
			...oldCtx,
			cart: appContext.cart.filter((el) => !idsToRemove.has(el.id))
		}));
	};
	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			try {
				const [heroRes, collectionsRes, siteMetaRes] = await Promise.all([
					fetch("/api/hero", { signal: controller.signal }),
					fetch("/api/collections", { signal: controller.signal }),
					fetch("/api/site-meta", { signal: controller.signal })
				]);
				if (!heroRes.ok || !collectionsRes.ok) throw new Error("One of the requests failed");
				const [heroData, collectionsData, siteMetaData] = await Promise.all([
					heroRes.json(),
					collectionsRes.json(),
					siteMetaRes.json()
				]);
				setAppContext((oldCtx) => ({
					...oldCtx,
					metaTitle: siteMetaData.location.name,
					metaDescription: siteMetaData.location.description,
					heroImages: heroData,
					initialHeroImages: heroData,
					collections: collectionsData,
					isLoading: false
				}));
			} catch (err) {
				if (err.name !== "AbortError") console.error(err);
			}
		};
		fetchData();
		return () => {
			controller.abort();
		};
	}, []);
	useEffect(() => {
		setCart(loadCart(CART_KEY));
	}, []);
	useEffect(() => {
		saveCart(CART_KEY, appContext.cart);
	}, [appContext.cart]);
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "cart") setCart(loadCart(CART_KEY));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "container mx-auto px-4 bg-white max-w-286.5",
		children: [
			/* @__PURE__ */ jsx(Header, {
				heroImages: appContext.heroImages,
				initialHeroImages: appContext.initialHeroImages,
				isLoading: appContext.isLoading,
				appContext,
				setCartOpen
			}),
			/* @__PURE__ */ jsx(Outlet, { context: {
				appContext,
				setAppContext
			} }),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(CartDrawer, {
				isOpen: appContext.isCartOpen,
				setIsOpen: setCartOpen,
				cart: appContext.cart,
				removeFromCart,
				refreshProducts
			})
		]
	});
}
//#endregion
//#region src/components/productList/ProductCard.jsx
function ProductCard({ product, loadingProducts }) {
	const { appContext, setAppContext } = useOutletContext();
	const addToCart = (item) => {
		const existingItem = appContext.cart.find((cartItem) => cartItem.id === item.id);
		setAppContext({
			...appContext,
			...existingItem ? { cart: [...appContext.cart] } : { cart: [...appContext.cart, item] },
			isCartOpen: true
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: " relative bg-stone-100 rounded shadow  transition overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "group",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "relative h-56 overflow-hidden bg-stone-100",
					children: product.imageUrl ? /* @__PURE__ */ jsx("img", {
						src: product.imageUrl,
						alt: product.name,
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ jsx("div", { className: "w-full h-full" })
				}),
				loadingProducts ? /* @__PURE__ */ jsx(LoadingBars, { width: 10 }) : /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 h-56 p-4 bg-gradient-to-b from-black/40  to-black/0 ",
					children: /* @__PURE__ */ jsx("p", {
						className: " text-sm uppercase font-semibold text-white",
						children: product.name
					})
				}),
				!loadingProducts && /* @__PURE__ */ jsx(Link, {
					className: "absolute inset-0 h-56 flex items-center justify-center z-10\n              opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0\n              transition duration-300 ease-out will-change-transform cursor-pointer",
					to: `/product/${product.slug}-${product.id}`,
					children: /* @__PURE__ */ jsx("div", {
						className: "text-center text-white px-0",
						children: /* @__PURE__ */ jsx("p", {
							className: " text-sm border border-white py-2 px-4 rounded",
							children: "Explore Details"
						})
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-3 flex flex-col",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm text-gray-600 mb-2",
				children: product.headline
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [product.stockLevel >= 1 ? /* @__PURE__ */ jsx("span", {
					className: "text-lg font-bold",
					children: formatCurrency(product.price)
				}) : /* @__PURE__ */ jsx("span", {
					className: "text-stone-700 font-normal ",
					children: loadingProducts ? "" : "SOLD"
				}), product.stockLevel >= 1 && /* @__PURE__ */ jsx("button", {
					className: " text-gray-600 text-xs px-2.5 py-2 border border-stone-400 rounded hover:shadow-md transition uppercase font-semibold",
					onClick: () => addToCart(product.item),
					children: "Buy Now"
				})]
			})]
		})]
	}, product.id);
}
//#endregion
//#region src/components/productList/ProductList.jsx
var productsPlaceholders = [
	{
		id: 1,
		name: "",
		description: "...",
		price: 0,
		image: ""
	},
	{
		id: 2,
		name: "",
		description: "...",
		price: 0,
		image: ""
	},
	{
		id: 3,
		name: "",
		description: "...",
		price: 0,
		image: ""
	}
];
function ProductList({ categoryId, tag }) {
	const { appContext: { productFetchIteration, latestProducts, collections, collectionsETag, latestProductsETag }, setAppContext } = useOutletContext();
	const productETag = categoryId ? collectionsETag : latestProductsETag;
	const cachedProducts = categoryId ? collections.find((el) => el.id === categoryId).products || [] : latestProducts;
	const initialProductsData = cachedProducts.length ? cachedProducts : productsPlaceholders;
	const initialLoadingState = cachedProducts.length ? false : true;
	const [productsData, setProductsData] = useState(initialProductsData);
	const [loadingProducts, setLoadingProducts] = useState(initialLoadingState);
	const params = new URLSearchParams();
	if (categoryId) params.append("categoryId", categoryId);
	if (tag) params.append("tag", tag);
	const query = params.toString();
	const itemsUrl = query ? `/api/items?${query}` : "/api/items";
	useEffect(() => {
		const controller = new AbortController();
		const fetchProductsData = async () => {
			try {
				const res = await fetch(itemsUrl, {
					signal: controller.signal,
					headers: cachedProducts.length && productETag ? { "If-None-Match": productETag } : {}
				});
				if (res.status === 304) {
					setProductsData(cachedProducts);
					setLoadingProducts(false);
					return;
				}
				const etag = res.headers.get("ETag");
				const data = await res.json();
				setProductsData(data);
				setLoadingProducts(false);
				setAppContext((oldCtx) => {
					const updatedCollections = oldCtx.collections.map((col) => col.id === categoryId ? {
						...col,
						products: data
					} : col);
					const cachedProductsSet = new Set(oldCtx.productCache);
					const updatedProductCache = [...new Set([...cachedProductsSet, ...data])];
					return {
						...oldCtx,
						...categoryId ? {
							collections: updatedCollections,
							collectionsETag: etag
						} : {
							latestProducts: data,
							latestProductsETag: etag
						},
						productCache: updatedProductCache
					};
				});
			} catch (err) {
				if (err.name !== "AbortError") console.error(err);
			}
		};
		fetchProductsData();
		return () => {
			controller.abort();
		};
	}, [productFetchIteration]);
	return /* @__PURE__ */ jsx("div", {
		className: "max-w-7xl mx-auto ",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: productsData.map((product) => /* @__PURE__ */ jsx(ProductCard, {
				product,
				loadingProducts
			}, product.id))
		})
	});
}
//#endregion
//#region src/pages/Collection/Collection.jsx
function Collection() {
	const { collectionSlug } = useParams();
	const { appContext } = useOutletContext();
	const collection = appContext.collections.find((el) => el.slug === collectionSlug);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Helmet, { children: [
		/* @__PURE__ */ jsx("title", { children: collection.name }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: appContext.metaDescription
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: collection.name
		})
	] }), collection && /* @__PURE__ */ jsx(ProductList, { categoryId: collection.id })] });
}
//#endregion
//#region src/pages/Contact/Contact.jsx
function Contact() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex justify-center items-center flex-col h-80",
		children: [/* @__PURE__ */ jsx("p", {
			className: " text-xl text-slate-700 ",
			children: "Please send an email to: "
		}), /* @__PURE__ */ jsx("a", {
			className: "mt-4 border-b-2 border-emerald-400 hover:text-slate-500",
			href: "mailto:lenivisual@gmail.com",
			children: "lenivisual@gmail.com"
		})]
	});
}
//#endregion
//#region src/Icons/RectangleStack.jsx
function RectangleStack({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 1.5,
		stroke: "currentColor",
		className: `size-6 ${className}`,
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
		})
	});
}
//#endregion
//#region src/components/collectionList/CollectionCard.jsx
function CollectionCard({ item, loadingCollections }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "group relative rounded overflow-hidden transition text-white bg-stone-50",
		style: {
			backgroundImage: `url(${item.imageUrl || ""})`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		},
		children: [loadingCollections ? /* @__PURE__ */ jsx(LoadingBars, { width: 10 }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40  to-black/0" }), /* @__PURE__ */ jsxs(Link, {
			className: "relative px-5 py-3 flex flex-col h-40 text-sm  cursor-pointer font-semibold",
			to: `/collection/${item.slug}`,
			children: [/* @__PURE__ */ jsx("h3", {
				className: " mb-2 uppercase",
				children: item.name
			}), !loadingCollections && /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 flex items-center justify-center z-10\n             opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0\n             transition duration-300 ease-out will-change-transform",
				children: /* @__PURE__ */ jsx("div", {
					className: "text-center text-white px-4",
					children: /* @__PURE__ */ jsx("p", {
						className: "mt-3 text-sm border border-white py-2 px-4 rounded",
						children: "View Collection"
					})
				})
			})]
		})]
	});
}
//#endregion
//#region src/components/collectionList/CollectionsList.jsx
function CollectionsList() {
	const { appContext } = useOutletContext();
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-1 flex items-center text-gray-800",
			children: [/* @__PURE__ */ jsx(RectangleStack, { className: "mr-1" }), /* @__PURE__ */ jsx("div", {
				className: "uppercase text-sm",
				children: "Art Collections"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ",
			children: appContext.collections.map((item) => /* @__PURE__ */ jsx(CollectionCard, {
				item,
				loadingCollections: appContext.isLoading
			}, item.id))
		})]
	});
}
//#endregion
//#region src/Icons/Heart.jsx
function Heart({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 1.5,
		stroke: "currentColor",
		className: `size-6 ${className}`,
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
		})
	});
}
//#endregion
//#region src/components/productList/RecentProducts.jsx
function RecentProducts() {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-1 flex items-center text-gray-800",
		children: [/* @__PURE__ */ jsx(Heart, { className: "mr-1" }), /* @__PURE__ */ jsx("div", {
			className: "uppercase text-sm",
			children: "Recently Crafted"
		})]
	}), /* @__PURE__ */ jsx(ProductList, { tag: "new" })] });
}
//#endregion
//#region src/pages/Home/Home.jsx
function Home() {
	const { appContext } = useOutletContext();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Helmet, { children: [
			/* @__PURE__ */ jsx("title", { children: appContext.metaTitle }),
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: appContext.metaDescription
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: appContext.metaTitle
			})
		] }),
		/* @__PURE__ */ jsx(CollectionsList, {}),
		/* @__PURE__ */ jsx(RecentProducts, {})
	] });
}
//#endregion
//#region src/pages/Product/ProductImageGallery.jsx
/**
* ProductImageGallery with Lightbox / Zoom Modal written by AI
*/
function ProductImageGallery({ images = [] }) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const selectedImage = images[selectedIndex];
	const openLightbox = (index) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};
	const closeLightbox = () => setIsOpen(false);
	const nextImage = () => {
		setSelectedIndex((prev) => (prev + 1) % images.length);
	};
	const prevImage = () => {
		setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
	};
	useEffect(() => {
		const handleKey = (e) => {
			if (!isOpen) return;
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowRight") nextImage();
			if (e.key === "ArrowLeft") prevImage();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [isOpen]);
	if (!images.length) return /* @__PURE__ */ jsx("div", {
		className: "w-full h-64 flex items-center justify-center bg-gray-100 rounded",
		children: /* @__PURE__ */ jsx("span", {
			className: "text-gray-400",
			children: "Loading images.."
		})
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "w-full max-w-2xl mx-auto",
		children: [/* @__PURE__ */ jsx("div", {
			className: "w-full aspect-square mb-4 overflow-hidden rounded shadow cursor-zoom-in",
			onClick: () => openLightbox(selectedIndex),
			children: /* @__PURE__ */ jsx("img", {
				src: selectedImage,
				alt: `Product image ${selectedIndex + 1}`,
				className: "w-full h-full object-cover transition-transform duration-300 hover:scale-105"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex gap-3 overflow-x-auto pb-2",
			children: images.map((img, index) => /* @__PURE__ */ jsx("button", {
				onClick: () => setSelectedIndex(index),
				className: `flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${selectedIndex === index ? "border-stone-500" : "border-transparent opacity-70 hover:opacity-100"}`,
				children: /* @__PURE__ */ jsx("img", {
					src: img,
					alt: `Thumbnail ${index + 1}`,
					className: "w-full h-full object-cover"
				})
			}, index))
		})]
	}), isOpen && /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center",
		children: [
			/* @__PURE__ */ jsx("button", {
				onClick: closeLightbox,
				className: "absolute top-4 right-4 text-white text-3xl",
				children: "×"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: prevImage,
				className: "absolute left-4 text-white text-3xl",
				children: "‹"
			}),
			/* @__PURE__ */ jsx("img", {
				src: selectedImage,
				alt: "Zoomed product",
				className: "max-h-[90vh] max-w-[90vw] object-contain rounded-md"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: nextImage,
				className: "absolute right-4 text-white text-3xl",
				children: "›"
			})
		]
	})] });
}
/**
* Example usage:
*
* const images = [
*   "/images/product1.jpg",
*   "/images/product2.jpg",
*   "/images/product3.jpg",
* ];
*
* <ProductImageGallery images={images} />
*/
//#endregion
//#region src/pages/Product/ProductInfoSkeleton.jsx
function ProductInfoSkeleton() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-4 col-span-6",
		children: [
			/* @__PURE__ */ jsx("h1", { className: " bg-slate-100 h-10 w-96 rounded" }),
			/* @__PURE__ */ jsx("p", { className: "bg-slate-100 h-8 w-16 rounded" }),
			/* @__PURE__ */ jsx("p", { className: "bg-slate-100 h-4 w-60 rounded" }),
			/* @__PURE__ */ jsx("p", { className: "bg-slate-100 h-4 w-40 rounded" }),
			/* @__PURE__ */ jsx("p", { className: "bg-slate-100 h-4 w-32 rounded" }),
			/* @__PURE__ */ jsx("p", { className: "bg-slate-100 h-4 w-56 rounded" }),
			/* @__PURE__ */ jsx("p", { className: "bg-slate-100 h-4 w-40 rounded" })
		]
	});
}
//#endregion
//#region src/pages/Product/Product.jsx
function ProductPage() {
	const { productSlug } = useParams();
	const segmentArray = productSlug.split("-");
	const productId = segmentArray[segmentArray.length - 1];
	const { appContext, setAppContext } = useOutletContext();
	const productETag = appContext.productETag;
	const cachedProduct = appContext.productCache.find((el) => el.itemId === productId);
	const [product, setProduct] = useState(cachedProduct || {});
	const [isLoading, setIsLoading] = useState(true);
	const [isCheckoutLoading, setCheckoutLoading] = useState(false);
	const isAvailable = product.item?.item_data.variations[0].inventoryCount >= 1;
	const addToCart = (item) => {
		const existingItem = appContext.cart.find((cartItem) => cartItem.id === item.id);
		setAppContext({
			...appContext,
			...existingItem ? { cart: [...appContext.cart] } : { cart: [...appContext.cart, item] },
			isCartOpen: true
		});
	};
	useEffect(() => {
		const controller = new AbortController();
		const fetchItemData = async () => {
			try {
				const res = await fetch(`/api/items/${productId}`, {
					signal: controller.signal,
					headers: cachedProduct && productETag ? { "If-None-Match": productETag } : {}
				});
				if (res.status === 304) {
					setProduct(cachedProduct);
					setIsLoading(false);
					return;
				}
				const etag = res.headers.get("ETag");
				const productData = await res.json();
				setProduct(productData);
				setIsLoading(false);
				setAppContext((oldCtx) => {
					const updatedProductCache = oldCtx.productCache.find((item) => item.itemId === productId) ? oldCtx.productCache : [...oldCtx.productCache, productData];
					return {
						...oldCtx,
						productCache: updatedProductCache,
						productETag: etag
					};
				});
			} catch (err) {
				if (err.name !== "AbortError") console.error(err);
			}
		};
		fetchItemData();
		return () => {
			controller.abort();
		};
	}, [appContext.productFetchIteration]);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-6 sm:grid-cols-1 lg:grid-cols-12",
		children: [/* @__PURE__ */ jsx("div", {
			className: "col-span-6",
			children: /* @__PURE__ */ jsx(ProductImageGallery, { images: product?.images || [] })
		}), isLoading ? /* @__PURE__ */ jsx(ProductInfoSkeleton, {}) : /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-4 col-span-6",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-semibold",
					children: product.item?.item_data.name
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-2xl font-medium text-gray-700",
					children: isAvailable ? /* @__PURE__ */ jsx("span", { children: formatCurrency(product.item?.item_data.variations[0].item_variation_data.price_money.amount) }) : /* @__PURE__ */ jsx("span", {
						className: "text-stone-500 font-normal px-3 py-1.5 border rounded",
						children: "SOLD"
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-gray-600 leading-relaxed",
					children: product.item?.item_data.description
				}),
				isAvailable && /* @__PURE__ */ jsxs("div", {
					className: "flex gap-4 mt-4",
					children: [/* @__PURE__ */ jsx("button", {
						className: "flex justify-center items-center bg-stone-900 text-white w-40 px-8 py-3 rounded hover:opacity-90 transition",
						onClick: () => addToCart(product.item),
						children: isCheckoutLoading ? /* @__PURE__ */ jsxs("svg", {
							className: "animate-spin h-5 w-5 text-white",
							xmlns: "http://www.w3.org/2000/svg",
							fill: "none",
							viewBox: "0 0 24 24",
							children: [/* @__PURE__ */ jsx("circle", {
								className: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								strokeWidth: "4"
							}), /* @__PURE__ */ jsx("path", {
								className: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							})]
						}) : /* @__PURE__ */ jsx("span", { children: "Buy Now" })
					}), /* @__PURE__ */ jsxs("button", {
						className: " flex gap-3 items-center border border-gray-500 pl-5 pr-6 py-3 rounded hover:bg-gray-100 transition",
						onClick: () => addToCart(product.item),
						children: [/* @__PURE__ */ jsx(ShoppingBagIcon, {}), /* @__PURE__ */ jsx("span", { children: "Add to Cart" })]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/Order/OrderSuccessPage.jsx
function OrderSuccessPage() {
	const [status, setStatus] = useState("loading");
	const [order, setOrder] = useState(null);
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get("orderId");
	const { appContext, setAppContext } = useOutletContext();
	const clearCart = () => setAppContext({
		...appContext,
		cart: []
	});
	useEffect(() => {
		let interval;
		async function fetchStatus() {
			try {
				const data = await (await fetch(`/api/order-status?orderId=${orderId}`)).json();
				if (data.status === "COMPLETED") {
					clearCart();
					setOrder(data.order);
					setStatus("success");
					clearInterval(interval);
				} else if (data.status === "FAILED") {
					setStatus("failed");
					clearInterval(interval);
				} else setStatus("pending");
			} catch (err) {
				setStatus("error");
				clearInterval(interval);
			}
		}
		if (orderId) {
			fetchStatus();
			interval = setInterval(fetchStatus, 2e3);
		} else setStatus("error");
		return () => clearInterval(interval);
	}, [orderId]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center bg-gray-50 p-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-lg  w-full bg-white shadow-xl rounded-2xl p-8 text-center",
			children: [
				status === "loading" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ jsxs("svg", {
							className: "animate-spin h-8 w-8 mb-6 text-black",
							xmlns: "http://www.w3.org/2000/svg",
							fill: "none",
							viewBox: "0 0 24 24",
							children: [/* @__PURE__ */ jsx("circle", {
								className: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								strokeWidth: "4"
							}), /* @__PURE__ */ jsx("path", {
								className: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							})]
						})
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-semibold",
						children: "Confirming your order..."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 mt-2",
						children: "Hang tight, we're verifying your payment."
					})
				] }),
				status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", { className: "animate-pulse h-8 w-8 bg-gray-300 rounded-full mx-auto mb-4" }),
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-semibold",
						children: "Processing payment"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-500 mt-2",
						children: "This usually takes a few seconds."
					})
				] }),
				status === "success" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-green-500 text-4xl mb-4",
						children: "✓"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold",
						children: "Payment successful"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-600 mt-2",
						children: "Thank you for your purchase! Your order has been confirmed."
					}),
					order && /* @__PURE__ */ jsxs("div", {
						className: "mt-6 text-left bg-gray-50 p-4 rounded-xl",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500",
								children: "Order ID"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "font-mono text-sm mb-2",
								children: order.id
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500",
								children: "Total"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "font-semibold mb-2",
								children: [
									"$",
									(order.totalMoney.amount / 100).toFixed(2),
									" ",
									order.totalMoney.currency
								]
							}),
							order.lineItems && /* @__PURE__ */ jsxs("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-500 mb-1",
									children: "Items"
								}), /* @__PURE__ */ jsx("ul", {
									className: "text-sm space-y-1",
									children: order.lineItems.map((item) => /* @__PURE__ */ jsxs("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsxs("span", { children: [
											item.name,
											" x",
											item.quantity
										] }), /* @__PURE__ */ jsxs("span", { children: ["$", (item.totalMoney.amount / 100).toFixed(2)] })]
									}, item.uid))
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex gap-3 justify-center",
						children: /* @__PURE__ */ jsx("a", {
							href: "/",
							className: "px-5 py-2 border rounded-xl hover:bg-gray-100",
							children: "Continue shopping"
						})
					})
				] }),
				status === "failed" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-red-500 text-5xl mb-4",
						children: "✕"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold",
						children: "Payment failed"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-600 mt-2",
						children: "Something went wrong. If you were charged, it will be refunded automatically."
					})
				] }),
				status === "error" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-yellow-500 text-5xl mb-4",
						children: "!"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-bold",
						children: "Unable to verify your order"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-600 mt-2",
						children: "Please check your email for confirmation or contact us."
					})
				] })
			]
		})
	});
}
//#endregion
//#region src/entry-server.jsx
function getApiBaseUrl(req) {
	if (process.env.API_BASE_URL) return process.env.API_BASE_URL;
	return `${req.headers["x-forwarded-proto"] || req.protocol || "http"}://${req.headers["x-forwarded-host"] || req.headers.host}`;
}
async function fetchJson(req, path) {
	const apiBaseUrl = getApiBaseUrl(req);
	const response = await fetch(`${apiBaseUrl}${path}`);
	if (!response.ok) throw new Error(`Failed to fetch ${apiBaseUrl}${path}: ${response.status}`);
	return response.json();
}
async function getHomeData(req) {
	const [heroData, collectionsData, siteMetaData] = await Promise.all([
		fetchJson(req, "/api/hero"),
		fetchJson(req, "/api/collections"),
		fetchJson(req, "/api/site-meta")
	]);
	return {
		metaTitle: siteMetaData.location.name,
		metaDescription: siteMetaData.location.description,
		heroImages: heroData,
		initialHeroImages: heroData,
		collections: collectionsData,
		isLoading: false,
		isCartOpen: false,
		cart: [],
		productFetchIteration: 1,
		latestProducts: [],
		productCache: []
	};
}
async function getProductData(req, productSlug) {
	const segmentArray = productSlug.split("-");
	const productId = segmentArray[segmentArray.length - 1];
	const product = await fetchJson(req, `/api/items/${productId}`);
	return {
		...await getHomeData(req),
		productCache: [product]
	};
}
async function getCollectionProducts(req, collectionSlug) {
	const segmentArray = collectionSlug.split("-");
	const collectionId = segmentArray[segmentArray.length - 1];
	const collectionProducts = await fetchJson(req, `/api/items?categoryId=${collectionId}`);
	const homeData = await getHomeData(req);
	const updatedCollections = homeData.collections.map((col) => col.id === collectionId ? {
		...col,
		products: collectionProducts
	} : col);
	return {
		...homeData,
		collections: updatedCollections
	};
}
async function getInitialData(url, req) {
	const pathname = url.split("?")[0];
	const productMatch = matchPath({ path: "/product/:productSlug" }, pathname);
	if (productMatch) return getProductData(req, productMatch.params.productSlug);
	const collectionMatch = matchPath({ path: "/collection/:collectionSlug" }, pathname);
	if (collectionMatch) return getCollectionProducts(req, collectionMatch.params.collectionSlug);
	return getHomeData(req);
}
async function render(url, req) {
	const helmetContext = {};
	const initialData = await getInitialData(url, req);
	return {
		appHtml: renderToString(/* @__PURE__ */ jsx(HelmetProvider, {
			context: helmetContext,
			children: /* @__PURE__ */ jsx(StaticRouter, {
				location: url,
				children: /* @__PURE__ */ jsxs(Routes, { children: [/* @__PURE__ */ jsxs(Route, {
					path: "/",
					element: /* @__PURE__ */ jsx(App, { initialData }),
					children: [
						/* @__PURE__ */ jsx(Route, {
							index: true,
							element: /* @__PURE__ */ jsx(Home, {})
						}),
						/* @__PURE__ */ jsx(Route, {
							path: "collection/:collectionSlug",
							element: /* @__PURE__ */ jsx(Collection, {})
						}),
						/* @__PURE__ */ jsx(Route, {
							path: "product/:productSlug",
							element: /* @__PURE__ */ jsx(ProductPage, {})
						}),
						/* @__PURE__ */ jsx(Route, {
							path: "contact",
							element: /* @__PURE__ */ jsx(Contact, {})
						}),
						/* @__PURE__ */ jsx(Route, {
							path: "success",
							element: /* @__PURE__ */ jsx(OrderSuccessPage, {})
						})
					]
				}), /* @__PURE__ */ jsx(Route, {
					path: "*",
					element: /* @__PURE__ */ jsx("main", {
						style: { padding: "1rem" },
						children: /* @__PURE__ */ jsx("p", { children: "There's nothing here!" })
					})
				})] })
			})
		})),
		initialData,
		helmet: helmetContext.helmet || {}
	};
}
//#endregion
export { render };
