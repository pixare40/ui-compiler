"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
const react_1 = __importDefault(require("react"));
class ErrorBoundary extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        var _a, _b;
        (_b = (_a = this.props).flagError) === null || _b === void 0 ? void 0 : _b.call(_a, error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || null;
        }
        return this.props.children;
    }
}
exports.ErrorBoundary = ErrorBoundary;
