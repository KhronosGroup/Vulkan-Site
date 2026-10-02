# VkQueryResultStatusKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryResultStatusKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryResultStatusKHR - Specific status codes for operations

Specific status codes that **can** be returned from a query are:

// Provided by VK_KHR_video_queue
typedef enum VkQueryResultStatusKHR {
    VK_QUERY_RESULT_STATUS_ERROR_KHR = -1,
    VK_QUERY_RESULT_STATUS_NOT_READY_KHR = 0,
    VK_QUERY_RESULT_STATUS_COMPLETE_KHR = 1,
  // Provided by VK_KHR_video_encode_queue
    VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR = -1000299000,
} VkQueryResultStatusKHR;

* 
[VK_QUERY_RESULT_STATUS_NOT_READY_KHR](#) specifies that the query
result is not yet available.

* 
[VK_QUERY_RESULT_STATUS_ERROR_KHR](#) specifies that operations did not
complete successfully.

* 
[VK_QUERY_RESULT_STATUS_COMPLETE_KHR](#) specifies that operations
completed successfully and the query result is available.

* 
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](#)
specifies that a video encode operation did not complete successfully
due to the destination video bitstream buffer range not being
sufficiently large to fit the encoded bitstream data.

[VK_KHR_video_queue](VK_KHR_video_queue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryResultStatusKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
