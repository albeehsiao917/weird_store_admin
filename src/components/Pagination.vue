<template>
	<div>
		<!-- pagination -->
		<nav aria-label="Page navigation example">
		  <ul class="pagination">
		    <li class="page-item" :class='{"disabled": !pagination.has_pre}'> <!-- 前一頁 -->
		      <a class="page-link" href="#" aria-label="Previous" 
		      	@click.prevent='getProducts(pagination.current_page - 1)'>
		        <span aria-hidden="true">&laquo;</span>
		        <span class="sr-only">Previous</span>
		      </a>
		    </li>

		    <li class="page-item" v-for='page in pagination.total_pages' :key='page'
		    	:class='{"active": pagination.current_page === page}'>
		    	<a class="page-link" href="#" @click.prevent='getProducts(page)'>{{ page }}</a>
		    </li>

		    <li class="page-item" :class='{"disabled": !pagination.has_next}'> <!-- 後一頁 -->
		      <a class="page-link" href="#" aria-label="Next"
		      	@click.prevent='getProducts(pagination.current_page + 1)'>
		        <span aria-hidden="true">&raquo;</span>
		        <span class="sr-only">Next</span>
		      </a>
		    </li>
		  </ul>
		</nav>
	</div>
</template>