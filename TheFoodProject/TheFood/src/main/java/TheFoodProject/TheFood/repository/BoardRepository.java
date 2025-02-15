package TheFoodProject.TheFood.repository;

import TheFoodProject.TheFood.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
        List<Board> findBycategory(Integer category);
        Board findByid(Integer id);
        List<Board> findByuserid(Integer userid);







}
