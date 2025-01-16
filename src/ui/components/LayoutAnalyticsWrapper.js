"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutAnalyticsWrapper = void 0;
const react_1 = __importStar(require("react"));
const NodeAnalyticsContext_1 = require("../context/NodeAnalyticsContext");
const ErrorBoundary_1 = require("./ErrorBoundary");
const LayoutAnalyticsWrapper = ({ children, layout }) => {
    const analyticsContext = (0, react_1.useContext)(NodeAnalyticsContext_1.LayoutNodeAnalyticsContext);
    const renderStartTime = (0, react_1.useRef)(0);
    const paintTime = (0, react_1.useRef)(0);
    // Pre-paint effect
    (0, react_1.useInsertionEffect)(() => {
        renderStartTime.current = performance.now();
    });
    // Post-layout effect
    (0, react_1.useLayoutEffect)(() => {
        // Measure after DOM mutations
        const layoutTime = performance.now() - renderStartTime.current;
        // Setup PerformanceObserver for paint timing
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastPaint = entries[entries.length - 1];
            paintTime.current = lastPaint.startTime + lastPaint.duration;
            if (layout.analyticsEvents.onRender) {
                analyticsContext.trackEvent(layout.analyticsEvents.onRender, {
                    nodeId: layout.nodeId,
                    nodeName: layout.nodeName,
                    zone: layout.zone,
                    renderDuration: layoutTime,
                    paintDuration: paintTime.current - renderStartTime.current,
                    timestamp: Date.now(),
                });
            }
            else {
                console.log('No onRender event');
            }
            observer.disconnect();
        });
        observer.observe({ entryTypes: ['paint'] });
        return () => observer.disconnect();
    });
    const onRenderError = (error, errorInfo) => {
        if (layout.analyticsEvents.onRenderError) {
            analyticsContext.trackEvent(layout.analyticsEvents.onRenderError, {
                error: { error, errorInfo },
                nodeId: layout.nodeId,
                nodeName: layout.nodeName,
                zone: layout.zone,
            });
        }
    };
    return react_1.default.createElement(ErrorBoundary_1.ErrorBoundary, { flagError: onRenderError }, children);
};
exports.LayoutAnalyticsWrapper = LayoutAnalyticsWrapper;
