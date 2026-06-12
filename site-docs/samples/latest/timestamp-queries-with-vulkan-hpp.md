# Timestamp queries with Vulkan-Hpp

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/api/hpp_timestamp_queries/README.html

## Table of Contents

- [Introduction](#_introduction)
- [A few important notes on timestamp queries](#_a_few_important_notes_on_timestamp_queries)
- [A_few_important_notes_on_timestamp_queries](#_a_few_important_notes_on_timestamp_queries)
- [Checking for support](#_checking_for_support)
- [Checking_for_support](#_checking_for_support)
- [Creating the query pool](#_creating_the_query_pool)
- [Creating_the_query_pool](#_creating_the_query_pool)
- [Resetting the query pool](#_resetting_the_query_pool)
- [Resetting_the_query_pool](#_resetting_the_query_pool)
- [Writing time stamps](#_writing_time_stamps)
- [Writing_time_stamps](#_writing_time_stamps)
- [Getting the results](#_getting_the_results)
- [Getting_the_results](#_getting_the_results)
- [Interpreting the results](#_interpreting_the_results)
- [Interpreting_the_results](#_interpreting_the_results)
- [vk::CommandBuffer::writeTimestamp2](#_vkcommandbufferwritetimestamp2)
- [Verdict](#_verdict)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/hpp_timestamp_queries). |
| --- | --- |

|  | A transcoded version of the API sample [Timestamp queries](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/timestamp_queries) that illustrates the usage of the C++ bindings of vulkan provided by vulkan.hpp. |
| --- | --- |

This tutorial, along with the accompanying example code, shows how to use timestamp queries to measure timings on the GPU.

The sample, based on the HDR one, does multiple render passes and will use timestamp queries to get GPU timings for the different render passes.
This is done by writing GPU timestamps at certain points within a command buffer.
These can then be read on the host and used for approximate profiling and to e.g.
improve performance where needed.

Vulkan offers several [query types](https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html#queries) that allow you to query different types of information from the GPU.
One such query type is the [timestamp query](https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html#queries-timestamps).

This provides your application with a mechanism to time the execution of commands on the GPU.
As with the other query types, a query pool is then used to either directly fetch or copy over the results to the host.

It’s important to know that timestamp queries differ greatly from how timing can be done on the CPU with e.g.
the high performance counter.
This is mostly due to how a GPU’s dispatches, overlaps and finishes work across different stages of the pipeline.
So while technically you can specify any pipeline stage at which the timestamp should be written, a lot of stage combinations and orderings won’t give meaningful result.
This also means that you can’t compare timestamps taken on different queues.

So while it may may sound reasonable to write timestamps for the vertex and fragment shader stage directly one after another, that will usually not return meaningful results due to how the GPU works.

And so for this example, we take the same approach as some popular CPU/GPU profilers by only using the top and bottom stages of the pipeline.
This combination is known to give proper approximate timing results on most GPUs.

Not all GPUs support timestamp queries, so before using them we need to make sure that they can be used.
This differs slightly from checking other features with a simple `vk::Bool`.
Here we need to check if the `timestampPeriod` limit of the physical device is greater than zero.
If that’s the case, timestamp queries are supported:

vk::PhysicalDeviceLimits const &device_limits = device->get_gpu().get_properties().limits;
if (device_limits.timestampPeriod == 0)
{
	throw std::runtime_error{"The selected device does not support timestamp queries!"};
}

Another limit we need to check is `timestampComputeAndGraphics`.
If this is `true`, all graphics and compute pipelines support timestamp queries and the above check is sufficient.
If not, we need to check if the queue we want to use supports timestamps:

if (!device_limits.timestampComputeAndGraphics)
{
	// Check if the graphics queue used in this sample supports time stamps
	vk::QueueFamilyProperties const &graphics_queue_family_properties = device->get_suitable_graphics_queue().get_properties();
	if (graphics_queue_family_properties.timestampValidBits == 0)
	{
		throw std::runtime_error{"The selected graphics queue family does not support timestamp queries!"};
	}
}

As with all query types, we first need to create a pool for the timestamp queries.
This is used to store and read back the results (see `prepare_time_stamp_queries`):

vk::QueryPoolCreateInfo query_pool_create_info({}, vk::QueryType::eTimestamp, static_cast(time_stamps.size()));
time_stamps_query_pool = get_device()->get_handle().createQueryPool(query_pool_create_info);

The interesting parts are the `queryType`, which we set to `vk::QueryType::eTimestamp` for using timestamp queries and the `queryCount`, which is the maximum number of the the timestamp query result this pool can store.

For this sample we’ll be using 6 time points, one for the start and one for the end of three render passes.

Before we can start writing data to the query pool, we need to reset it.
When using Vulkan 1.0 or 1.1, this requires us to enable the `VK_EXT_host_query_reset` extension:

add_device_extension(VK_EXT_HOST_QUERY_RESET_EXTENSION_NAME);

With using Vulkan 1.2 this extension has become part of the core and we won’t have to manually enable it.

Independent of this, we also need to enable the `hostQueryReset` physical device feature:

auto &requested_extension_features          = gpu.request_extension_features();
requested_extension_features.hostQueryReset = true;

With features and extensions properly enabled, we can now reset the pool at the start of the command buffer, before writing the first timestamp.
This is done using `vk::CommandBuffer::resetQueryPool`:

...
command_buffer.begin(command_buffer_begin_info);
command_buffer.resetQueryPool(time_stamps_query_pool, 0, static_cast(time_stamps.size()));

---

Unlike getting CPU side timing information that can be queried immediately, with GPU time stamps we need to tell the implementation inside a command buffer when/where to write timestamps instead.
The results are then fetched afterwards (see below).

This is done inside the command buffer with `vk::CommandBuffer::writeTimestamp`.
This function will request a timestamp to be written from the GPU for a certain pipeline stage and write that value to memory.

The most interesting part of calling this function is the `pipelineStage` argument.
As noted earlier, it’s technically possible to use any pipeline stage in here, not all pipeline stages will yield proper results due to how GPUs overlap work.
It’s also important to note that not all implementations are able to latch timers at all pipeline stages (e.g.
if they don’t have hardware that maps to a given stage) and may return timers at a later pipeline stage instead.

Calling this function also defines an execution dependency similar to a barrier on all commands that were submitted before it.

command_buffer.writeTimestamp(vk::PipelineStageFlagBits::eTopOfPipe, time_stamps_query_pool, 0);
// Do some work
for (int i = 0; i 

To measure GPU times for the draw calls(s) we first tell the GPU to write a timestamp at the `vk::PipelineStageFlagBits::eTopOfPipe` pipeline stage.
This is not a real pipeline stage (as in e.g.
the vertex or fragment stages) but a special constant that tells the GPU to write the timestamp when all previous commands have been processed by the GPU’s command processor.
This ensures that we get a timestamp right before starting on the draw calls we want to measure, which will be the base for calculating our delta time.

The second timestamp is written at the `vk::PipelineStageFlagBits::eBottomOfPipe` pipeline stage.
Once again this is not a real pipeline stage, but it again tells the GPU to write the timestamp after all work has been finished.

Reading back the results can be done in two ways:

* 
Copy the results into a `vk::Buffer` inside the command buffer using `vk::CommandBuffer::copyQueryPoolResults`

* 
Get the results after the command buffer has finished executing using `vk::Device::getQueryPoolResults`

For our sample we’ll use option two (see `get_time_stamp_results`):

queue.submit(submit_info);
...
// The number of timestamps changes if the bloom pass is disabled
uint32_t count = bloom ? time_stamps.size() : time_stamps.size() - 2;

vk::Result result = device->get_handle().getQueryPoolResults(time_stamps_query_pool,
															 0,
															 count,
															 time_stamps.size() * sizeof(uint64_t),
															 time_stamps.data(),
															 sizeof(uint64_t),
															 vk::QueryResultFlagBits::e64 | vk::QueryResultFlagBits::eWait);

Most arguments are straightforward, e.g.
where the data will be copied to (the `time_stamps` vector).
The important part here are the `vk::QueryResultFlags	` flags used here.

`vk::QueryResultFlagBits::e64` will tell the api that we want to get the results as 64 bit values.
Without this flag, we would only get 32 bit values.
And since timestamp queries can operate in nanoseconds, only using 32 bits could result into an overflow.
E.g.
if your device has a `timestampPeriod` of 1, so that one increment in the result maps to exactly one nanosecond, with 32 bit precision you’d run into such an overflow after only about 0.43 seconds.

The `vk::QueryResultFlagBits::eWait` bit then tells the api to wait for all results to be available.
So when using this flag the values written to our `time_stamps` vector is guaranteed to be available after calling `vk::Device::getQueryPoolResults`.
This is fine for our use-case where we want to immediately access the results, but may introduce unnecessary stalls in other scenarios.

Alternatively you can use the `vk::QueryResultFlagBits::eWithAvailability` flag, which will let you poll the availability of the results and defer writing new timestamps until the results are available.
This should be the preferred way of fetching the results in a real-world application.
Using this flag an additional availability value is inserted after each query value.
If that value becomes non-zero, the result is available.
You then check availability before writing the timestamp again.

Here is a basic example of how this could look like for a single timestamp value:

// time_stamp_with_availibility[current_frame * 2] contains the queried timestamp
// time_stamp_with_availibility[current_frame * 2 + 1] contains availability of the timestamp
std::array time_stamp_with_availibility{};

void drawFrame()
{
	command_buffer.begin(command_buffer_begin_info);

	// Only write new timestamp if previous result is available
	if (time_stamp_with_availibility[current_frame * 2 + 1] != 0)
	{
		command_buffer.writeTimestamp(vk::PipelineStageFlagBits::eTopOfPipe, time_stamps_query_pool, 0);
	}

	// Issue draw commands

	command_buffer.end();

	// Get deferred time stamp query for the current frame
	vk::Result result = device.getQueryPoolResults(time_stamps_query_pool,
	                                               0,
	                                               1,
	                                               2 * sizeof(uint64_t),
	                                               &time_stamp_with_availibility[current_frame * max_frames_in_flight],
	                                               2 * sizeof(uint64_t),
	                                               vk::QueryResultFlagBits::e64 | vk::QueryResultFlagBits::eWithAvailability);
	assert(result == vk::Result::eSuccess);

	// Display time stamp for the current frame if available
	if (time_stamp_with_availibility[current_frame * 2 + 1] != 0) {
		std::cout 

After we have read back the results to the host, we are ready to interpret them.
E.g.
for displaying them in a user interface.

The results we got back do not actually contain a time value, but rather a number of "ticks".
So to get the actual time value we need to translate these values first.

This is done using `timestampPeriod` limit of the physical device.
It contains the number of nanoseconds it takes for a timestamp query value to be increased by 1 ("tick").

In our sample, we want to display the delta between two timestamps in milliseconds, so in addition to the above rule we also multiply the value accordingly.

vk::PhysicalDeviceLimits const &device_limits = device->get_gpu().get_properties().limits;
float delta_in_ms = float(time_stamps[1] - time_stamps[0]) * device_limits.timestampPeriod / 1000000.0f;

The [VK_KHR_synchronization2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_synchronization2.html) extension introduced `vk::CommandBuffer::writeTimestamp2`.
This is pretty much the same as the `vk::CommandBuffer::writeTimestamp` function used in this sample, but adds support for some additional pipeline stages using `vk::PipelineStageFlags2`.

Even though timestamp queries are limited due to how a GPU works, they can still be useful for profiling and finding performance GPU bottlenecks.
