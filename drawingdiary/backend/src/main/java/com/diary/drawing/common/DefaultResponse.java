package com.diary.drawing.common;

public class DefaultResponse<T> {

    private static final String SUCCESS_STATUS = "success";

    private String status;
    private T data;
    private String message;

    public static <T> DefaultResponse<T> successResponse(T data) {
        return new DefaultResponse<>(SUCCESS_STATUS, data, null);
    }

    public static DefaultResponse<?> successWithNoContent() {
        return new DefaultResponse<>(SUCCESS_STATUS, null, null);
    }

    private DefaultResponse(String status, T data, String message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}