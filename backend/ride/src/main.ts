import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controller/MainController";
import RequestRide from "./application/usecase/RequestRide";
import RideRepositoryDatabase from "./infra/repository/RideRepositoryDatabase";
import GetRide from "./application/usecase/GetRide";
import RepositoryDatabaseFactory from "./infra/factory/RepositoryDatabaseFactory";
import Registry from "./infra/di/Registry";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import AccountGatewayHttp from "./infra/gateway/AccountGatewayHttp";

const connection = new PgPromiseAdapter();
const httpClient = new AxiosAdapter();
const accountGateway = new AccountGatewayHttp(httpClient);
const rideRepository = new RideRepositoryDatabase(connection);
const repositoryFactory = new RepositoryDatabaseFactory(connection);
const requestRide = new RequestRide(repositoryFactory, accountGateway);
const getRide = new GetRide(rideRepository, accountGateway);
const httpServer = new ExpressAdapter();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("requestRide", requestRide);
Registry.getInstance().provide("getRide", getRide);
new MainController();
httpServer.listen(3001);