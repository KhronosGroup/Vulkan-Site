# vkResetQueryPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetQueryPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetQueryPool - Reset queries in a query pool

To reset a range of queries in a query pool on the host, call:

// Provided by VK_VERSION_1_2
void vkResetQueryPool(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount);

// Provided by VK_EXT_host_query_reset
// Equivalent to vkResetQueryPool
void vkResetQueryPoolEXT(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount);

* 
`device` is the logical device that owns the query pool.

* 
`queryPool` is the handle of the query pool managing the queries
being reset.

* 
`firstQuery` is the initial query index to reset.

* 
`queryCount` is the number of queries to reset.

This command sets the status of query indices [`firstQuery`,
`firstQuery` +  `queryCount` - 1] to unavailable.

If `queryPool` is [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) this command
sets the status of query indices [`firstQuery`, `firstQuery`
+  `queryCount` - 1] to unavailable for each pass.

Valid Usage

* 
[](#VUID-vkResetQueryPool-firstQuery-09436) VUID-vkResetQueryPool-firstQuery-09436

`firstQuery` **must** be less than the number of queries in
`queryPool`

* 
[](#VUID-vkResetQueryPool-firstQuery-09437) VUID-vkResetQueryPool-firstQuery-09437

The sum of `firstQuery` and `queryCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkResetQueryPool-None-02665) VUID-vkResetQueryPool-None-02665

The [`hostQueryReset`](../../../../spec/latest/chapters/features.html#features-hostQueryReset) feature **must** be
enabled

* 
[](#VUID-vkResetQueryPool-firstQuery-02741) VUID-vkResetQueryPool-firstQuery-02741

Submitted commands that refer to the range specified by `firstQuery`
and `queryCount` in `queryPool` **must** have completed execution

* 
[](#VUID-vkResetQueryPool-firstQuery-02742) VUID-vkResetQueryPool-firstQuery-02742

The range of queries specified by `firstQuery` and `queryCount`
in `queryPool` **must** not be in use by calls to
[vkGetQueryPoolResults](vkGetQueryPoolResults.html) or `vkResetQueryPool` in other threads

Valid Usage (Implicit)

* 
[](#VUID-vkResetQueryPool-device-parameter) VUID-vkResetQueryPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkResetQueryPool-queryPool-parameter) VUID-vkResetQueryPool-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkResetQueryPool-queryPool-parent) VUID-vkResetQueryPool-queryPool-parent

 `queryPool` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_host_query_reset](VK_EXT_host_query_reset.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDevice](VkDevice.html), [VkQueryPool](VkQueryPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkResetQueryPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
