import React, { createContext, PropsWithChildren, useMemo } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";

interface IDrawerContextValues {
  userDetails: FetchUserAttributesOutput;
  watchlists: Watchlist[];
  isDrawerLoading: boolean;
}

export const DrawerContext = createContext<IDrawerContextValues>(
  {} as IDrawerContextValues
);

export const DrawerContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const fetchUserWatchlists = async () => {
    const response = await fetch(`/api/user/watchlists?userId=${userId}`, {
      method: "GET",
    });

    const userWatchlists = await response.json();

    return userWatchlists;
  };

  const { data: watchlists, isFetching: isFetchingWatchlists } = useQuery<
    Watchlist[]
  >({
    queryKey: ["watchlists-by-user", userId],
    queryFn: fetchUserWatchlists,
    initialData: [],
  });

  const syncUserDetails = async () => {
    const userAttributes = await fetchUserAttributes();
    const { name, preferred_username: username } = userAttributes;

    await fetch(`/api/user/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        username,
      }),
    });

    return userAttributes;
  };

  const { data: userDetails, isFetching: isFetchingUserDetails } =
    useQuery<FetchUserAttributesOutput>({
      queryKey: ["users", userId],
      queryFn: syncUserDetails,
      initialData: {},
    });

  const isDrawerLoading = isFetchingWatchlists || isFetchingUserDetails;

  const value = useMemo(
    () => ({
      userDetails,
      watchlists,
      isDrawerLoading,
    }),
    [userDetails, watchlists, isDrawerLoading]
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};
